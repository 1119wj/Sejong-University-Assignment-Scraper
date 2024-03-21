import { Box, Tab, Tabs } from '@mui/material'


import type { Course } from '@src/types'
import { courseData } from '@src/data/data' // for Test 

type Props = {
    courseList: Course[]
    selectedCourseId: string
    setSelectedCourseId: React.Dispatch<React.SetStateAction<string>>
  }

  const CourseTabs = ({ courseList, selectedCourseId, setSelectedCourseId }: Props) => {
    //console.log(selectedCourseId);
    return (
        <Box display="flex" sx={{width:'40%',height:'90%'}}>
        <Tabs
        orientation="vertical">
        {courseList.map((course, index) => (
          <Tab label={course.title} sx={
            {
              fontSize:'14px',
              "&:hover":{fontWeight:'600', color:'#363535'},
              "&:focus":{
                outline:'none',
                border:'none'
              },
              "&.Mui-selected": {
                outline: 'none',
                border: 'none',                                                                   
              },
              fontWeight: selectedCourseId === course.id ? '600':'400',
              color: selectedCourseId === course.id ? '#f7f7f6':'#797979',
              bgcolor: selectedCourseId === course.id ? '#b62724':'bg.color',
              transition: 'color 0.2s,bgcolor 0.2s',
              borderRadius : 2,
              cursor:'pointer',
            }} tabIndex={index} key={index} onClick={()=>setSelectedCourseId(course.id)} />
        ))}
      </Tabs>
      </Box>
    )
  }
  
  export default CourseTabs
