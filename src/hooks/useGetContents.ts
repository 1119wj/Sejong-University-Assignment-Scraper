import { useEffect, useState } from 'react'
import { differenceInHours } from 'date-fns'

import { getActivities,  getCourses } from '@src/service'
import type { ActivityType, Contents } from '@src/types'
import { ActivityData } from '@src/data/data'

type Options = {
    enabled?: boolean
    refreshTime?: number
    OnAlram? : boolean
}
const useGetContents = (options:Options)=>{

    const _options = { 
        enabled: true, 
        refreshTime: 1000 * 60 * 20, // 20분
        onAlram: true,
        ...options, 
      };
    const [isLoading,setIsLoading] = useState(false);
    const [data, setData] = useState<Contents>({
        courseList: [{id:'-1', title:'전체',label:''}],
        activityList: [],
        updateAt : new Date().toISOString(),
    });
  
    const getAndSetData = async ()=>{
        const courses = await getCourses();
        const activitiesPromises = courses.map((course) => 
          getActivities(course.id, course.title).catch((error) => {
          console.error(`Error getting activities for course ${course.id}:`, error);
          return [];
        })
      );
        let activities = (await Promise.all(activitiesPromises)).flat();
        
        const updateAt = new Date().toISOString();
        
        chrome.storage.local.set({
            courses,
            activities,
            updateAt,
        });
        setData({
            courseList: [{ id: '-1', title: '전체', label: '-1'}, ...courses],
            activityList: activities,
            updateAt,
        });
        setIsLoading(false);
  }
  
    const getLocalData = () => {
      chrome.storage.local.get(({ updateAt, courses, activities }) => {

        if (!updateAt || !courses || !activities) {
          setIsLoading(true);
          return getAndSetData();
        }
    
        setData({
          courseList: [{ id: '-1', title: '전체' }, ...courses],
          activityList: activities,
          updateAt,
        });
      });
        setIsLoading(false);
      }
    
      const refetch = () => {
        if (isLoading) return;
        setIsLoading(true);
        getAndSetData();
        notificate();
      }
      const notificate = ()=>{
        chrome.storage.local.get(({updateAt,courses,activities})=>{
          const factivities = activities as ActivityType[];
          const copy = [...factivities];
          const NotificateTitles : string[] = [];
          const now = new Date();

          copy.map((activity, i) => {
            const endAtDate = new Date(activity.endAt);
            const hoursDiff = differenceInHours(endAtDate, now);
            
            if (hoursDiff > 0 && hoursDiff <= 48 && activity.hasSubmitted == false) {
              NotificateTitles.push(activity.courseTitle);
            }
          });
          
          
          if (NotificateTitles.length && options.OnAlram) {
            NotificateTitles.map((v, i) => {
              chrome.runtime.sendMessage({action: "createNotification", title: "알림", message: `${v}의 마감일자가 얼마 남지 않았습니다.`});
            })
          }
        });
      }
      useEffect(() => {
        if (isLoading) {
          console.log("Is Loading!!");
          return;
        };
    
        if (_options.enabled) {
          if (_options.refreshTime < new Date().getTime() - new Date(data.updateAt).getTime()) {
            refetch();
          } else {
            //refetch();
            getLocalData();
          }
        }
      }, [_options.enabled]);
    
      useEffect(() => {
        //refetch();
        getLocalData();
        const currentUrl = window.location.href;
        if (currentUrl === "https://ecampus.sejong.ac.kr/dashboard.php") {
          notificate();
        }
      }, []);
      
      return { data, isLoading, refetch };
    };
export default useGetContents;