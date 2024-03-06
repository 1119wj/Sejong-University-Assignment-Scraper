


import { Box, Tab, Tabs } from '@mui/material'
import type { Course } from '@src/types'

type Props = {
    courseList: Course[]
    selectedCourseId: string
    setSelectedCourseId: React.Dispatch<React.SetStateAction<string>>
  }
  
  const CourseTabs = ({ courseList, selectedCourseId, setSelectedCourseId }: Props) => {
    console.log(selectedCourseId);
    return (
        <Box display="flex" sx={{height:400, width:'40%'}}>
        <Tabs
        orientation="vertical">
        {courseList.map((course, index) => (
          <Tab label={course.title} tabIndex={index} key={index} onClick={()=>setSelectedCourseId(course.id)} />
        ))}
      </Tabs>
      </Box>
    )
  }
  
  export default CourseTabs
