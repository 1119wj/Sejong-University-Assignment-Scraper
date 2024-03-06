import axios from 'axios'
import * as cheerio from 'cheerio'
import type { ActivityType, Assignment, Course, Video } from '@src/types'
import { ConstructionOutlined } from '@mui/icons-material';


const fetchHTML = async (url: string)=>{
    try{
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        return $;
    }catch(error){
        console.error(`Error fetching the HTML from ${url}:`, error);
        return null;
    }
}
export const getCourses = async (): Promise<Course[]> => {
    const $ = await fetchHTML('https://ecampus.sejong.ac.kr/dashboard.php');
    if (!$){return [];}

    const courses: Course[]= $('.course-link').map((i, el) => {
        const id = getLinkId($(el).attr('href'));
        const title = $(el).find('.course-title').text();
        const label = $(el).find('.course-label').text();
        
        return {id,title,label};
    }
    ).get();
    courses.filter(course => course.label ==='교과학부');
    console.log(courses, "From getCourses");
    return courses;
}
  
export function getLinkId(link: string | undefined):string {
    if (typeof link !== 'string') return '';
    const url = new URL(link);
    return url.searchParams.get('id') || '';
}

export const getActivities = async(
    courseId : string,
    courseTitle : string
) : Promise<ActivityType[]> => {
    console.log(courseId,"From getActivities");
    const $ = await fetchHTML(`https://ecampus.sejong.ac.kr/course/view.php?id=${courseId}`);
    //const $ = await fetchHTML('https://ecampus.sejong.ac.kr/course/view.php?id=9478');
    
    if (!$){
        console.log("FetchHTML ERROR");
        return [];  
    }
    const video: Video[] = getVideoFromCourse($,courseId, courseTitle);
    console.log("video =>",video);
    return [...video];
}


const getVideoFromCourse = (
    $: cheerio.CheerioAPI,
    courseId: string,
    courseTitle: string
): Video[]=>{
    return $('li.section.main.clearfix').map((i,el)=>{
        const sectionTitle = $(el).find('h3.sectionname span').text().trim();
        return $(el).find('.activity.vod.modtype_vod').map((i,el):Video=>{
            const urlMatch = $(el).find('a').attr('onclick')?.match(/'([^']+)'/);
            const link = urlMatch ? urlMatch[1]:'';
            const id = getLinkId(link);
            const title = $(el).find('span .instancename').text().trim();
            const [startAt, endAt] = $(el).find('span text-ubstrap').text().trim().replace(/&nbsp;/g, ' ').trim().split(' ~ ');
            const checkbox = $(el).find('img.icon').attr('title');
            const hasSubmitted = checkbox ? checkbox.includes('완료함') : false;
            return {
                type: 'video' as const,
                id,
                courseId,
                courseTitle,
                title,
                startAt,
                endAt,
                sectionTitle,
                hasSubmitted
            }
        })
        .get()
    })
    .get()
}