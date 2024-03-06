interface Activity {
    id: string
    courseId: string
    courseTitle: string
    title: string
    startAt: string
    endAt: string
    hasSubmitted: boolean
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
    type: 'video'
    sectionTitle: string
}
  
export type ActivityType = Assignment | Video

export type Contents = {
    courseList: Course[]
    activityList: ActivityType[]
    updateAt: string
  }