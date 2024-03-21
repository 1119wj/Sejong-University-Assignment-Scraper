import { List, Typography } from '@mui/material'

import { ActivityType } from '@src/types'
import useFilterItem from '@src/hooks/useFilterItem'
import Activity_item from '@src/components/Activity_Item2'
import { ActivityData } from '@src/data/data' // for test
import { differenceInHours } from 'date-fns'


type Props = { // pos -> 현재 fetch 진행률 후에 Loading component 업데이트를 위함
  //isLoading -> for Loading Component
    activityList: ActivityType[]
    selectedCourseId: string
    pos: number
    isLoading: boolean
  }
  
const Activity_list = ({activityList,selectedCourseId,pos,isLoading}:Props)=>{

    const filteredActivities = useFilterItem(
        activityList, /// test 시 ActivityData 넣고 테스트
        selectedCourseId
      );
    //console.log(filteredActivities,"From Activity_list");
    
    return (    
        <>
        <List sx={{
          height:'90%', 
          overflow:'auto', 
          bgcolor:'#eee',
          p:2,width:'50%',
          marginBottom:'20',
          "&::-webkit-scrollbar":{color:'#8f8e8e', width:0.4},
          "&::-webkit-scrollbar-thumb":{width: 1,bgcolor:'#bbb'}
          }} dense={true}>
        {filteredActivities.length === 0 ? <Typography>진행 중인 과제가 없습니다.</Typography> : filteredActivities.map((activity)=>
            <Activity_item activity={activity}></Activity_item>
        )}
        </List>
        </>
    )
}
export default Activity_list;