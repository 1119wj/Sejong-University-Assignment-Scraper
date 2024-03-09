interface Activity {
    id: string
    courseId: string
    courseTitle: string
    title: string
    startAt: string
    endAt: string
    hasSubmitted: boolean
    link: string
}
export interface Course {
    id: string
    title: string
    label : string
}
  
export interface Assignment extends Activity {
    type: 'assignment'
    sectionTitle: string
}
  
export interface Video extends Activity {
    type: 'vod'
    sectionTitle: string
}
export interface Quiz extends Activity{
    type: 'quiz'
    sectionTitle: string
}
  
export type ActivityType = Assignment | Video | Quiz

export type Contents = {
    courseList: Course[]
    activityList: ActivityType[]
    updateAt: string
  }