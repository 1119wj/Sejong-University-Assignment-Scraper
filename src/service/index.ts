import axios from 'axios'
import * as cheerio from 'cheerio'
import type { ActivityType, Assignment, Course, Quiz, Video } from '@src/types'


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
    const filteredCourses = courses.filter(course => course.label ==='교과학부');
    return filteredCourses;
}
  
export function getLinkId(link: string | undefined):string {
    if (typeof link !== 'string') return '';
    if (link.length===0) return '';
    const url = new URL(link);
    return url.searchParams.get('id') || '';
}

export const getActivities = async(
    courseId : string,
    courseTitle : string
) : Promise<ActivityType[]> => {
    const $ = await fetchHTML(`https://ecampus.sejong.ac.kr/course/view.php?id=${courseId}`);
    //const $ = await fetchHTML('https://ecampus.sejong.ac.kr/course/view.php?id=9478');
    
    if (!$){
        console.log("FetchHTML ERROR");
        return [];  
    }
    const video: ActivityType[] = getActivityFromCourse($,courseId, courseTitle,'vod');
    //console.log("Video =>",video);
    const quiz: ActivityType[] = getActivityFromCourse($,courseId,courseTitle,'quiz');
    //console.log("Quiz =>",quiz);
    const assignment: ActivityType[] = getActivityFromCourse($,courseId,courseTitle,'assign');
    //console.log("assignment =>",assignment);
    return [...video,...quiz,...assignment];
}


const getVideoFromCourse = (
    $: cheerio.CheerioAPI,
    courseId: string,
    courseTitle: string,
    contentType: string
): Video[]=>{
    return $('.total-sections li.section.main.clearfix').map((i,el)=>{
        const sectionTitle = $(el).find('h3.sectionname span').text().trim();
        return $(el).find(`.activity.${contentType}.modtype_${contentType}`).map((i,el):Video=>{
            //console.log($(el).html(), "from video");
            const urlMatch = $(el).find('a').attr('onclick')?.match(/'([^']+)'/);
            const link = urlMatch ? urlMatch[1]:'';
            const link1 = $(el).find('a').attr('href');
            const id = getLinkId(link);
            const TPtitle = $(el).find('div.activityinstance span.instancename').text().trim();
            const titleLength = TPtitle.length;
            const title = TPtitle.substring(0,titleLength-4); // 뒤에 ' 동영상'을 슬라이싱하기 위함
            const [startAt, endAt] = $(el).find('span.text-ubstrap').text().trim().replace(/&nbsp;/g, ' ').trim().split(' ~ ');
            const checkbox = $(el).find('img.icon').attr('title');
            const hasSubmitted = checkbox ? checkbox.includes('완료함') : false;
            return {
                type: 'vod' as const,
                id,
                courseId,
                courseTitle,
                title,
                startAt,
                endAt,
                sectionTitle,
                hasSubmitted,
                link
            }
        }
        )
        .get()
    })
    .get()
}
const getActivityFromCourse = (
    $: cheerio.CheerioAPI,
    courseId: string,
    courseTitle: string,
    contentType: string
): ActivityType[]=>{
    return $('.total-sections li.section.main.clearfix').map((i,el)=>{
        const sectionTitle = $(el).find('h3.sectionname span').text().trim();
        return $(el).find(`.activity.${contentType}.modtype_${contentType}`).map((i,el):ActivityType=>{
            //console.log($(el).html(), "from video");
            let link:string|undefined = '';
            const TPtitle = $(el).find('div.activityinstance span.instancename').text().trim();
            const titleLength = TPtitle.length;
            let title = '';
            if (contentType === 'vod'){
                const urlMatch = $(el).find('a').attr('onclick')?.match(/'([^']+)'/);
                link = urlMatch ? urlMatch[1]:'';
                title = TPtitle.substring(0,titleLength-4); // 뒤에 ' 동영상'을 슬라이싱하기 위함
            }
            else if(contentType ==='quiz'){
                link = $(el).find('a').attr('href');
                if (!link){
                    link = '';
                }
                title = TPtitle;
            }
            const id = getLinkId(link);
            const [startAt, endAt] = $(el).find('span.text-ubstrap').text().trim().replace(/&nbsp;/g, ' ').trim().split(' ~ ');
            const checkbox = $(el).find('img.icon').attr('title');
            const hasSubmitted = checkbox ? checkbox.includes('완료함') : false;
            const type =  contentType as 'vod'|'quiz'|'assignment';
            return {
                type,
                id,
                courseId,
                courseTitle,
                title,
                startAt,
                endAt,
                sectionTitle,
                hasSubmitted,
                link
            }
        }
        )
        .get()
    })
    .get()
}