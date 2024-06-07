import { useEffect, useState } from 'react'

import { getActivities,  getCourses } from '@src/service'
import type { ActivityType, Contents } from '@src/types'
import { differenceInHours } from 'date-fns'
import { ActivityData } from '@src/data/data'

type Options = {
    enabled?: boolean
    refreshTime?: number
    OnAlram? : boolean
}
const useGetContents = (options:Options)=>{

    const _options = { // 객체를 스프레드 연산자로 결합할 경우
        enabled: true, // 나중에 등장하는 객체 맴버 값으로 덮어씌워짐
        refreshTime: 1000 * 60 * 20, // 20분
        onAlram: true,
        ...options, 
      };
    const [isLoading,setIsLoading] = useState(false);
    const [progress,setProgress] = useState(0);
    const [data, setData] = useState<Contents>({
        courseList: [{id:'-1', title:'전체',label:''}],
        activityList: [],
        updateAt : new Date().toISOString(),
    });
    const getData = async ()=>{
        const courses = await getCourses(); //비동기적으로 코스정보배열 불러오기
        //console.log(courses);
        const maxProgress = courses.length*2; // Progress 표현할 변수
        let curProgress = 0;
        const activitiesPromises = courses.map((course) => 
          getActivities(course.id, course.title).catch((error) => {
        // 각각의 getActivities 실행에서 오류가 발생하면, 여기서 그 오류를 캐치합니다.
          console.error(`Error getting activities for course ${course.id}:`, error);
        return []; // 오류가 발생한 코스에 대해서는 빈 배열을 반환합니다.
        })
      );
    let activities = (await Promise.all(activitiesPromises)).flat();
        // let activities = await Promise.all(
        //     courses.map(async course=>{ //map함수로 Promise[]을 all로 모두 resolve
        //         return getActivities(course.title, course.id);
        //     }
        //     )
        // ).then(activities=> activities.flat());
        //console.log(activities,"From Promise");
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
        setProgress(0);
        setIsLoading(false);
    }
    const getLocalData = () => {
        console.log("getLocalData !");
        chrome.storage.local.get(({ updateAt, courses, activities }) => {
          //console.log(updateAt,courses,activities);
          if (!updateAt || !courses || !activities) {
            setIsLoading(true);
            return getData();
          }
    
          setData({
            courseList: [{ id: '-1', title: '전체' }, ...courses],
            activityList: activities,
            updateAt,
          });
        })
    
        setProgress(0);
        setIsLoading(false);
      }
    
      const refetch = () => {
        console.log("Refetching");
        if (isLoading) return;
        setIsLoading(true);
        getData();
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
          
          console.log(NotificateTitles, "NotificateTitles");
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
      
      return { data, progress, isLoading, refetch };
    };
export default useGetContents;