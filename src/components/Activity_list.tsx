
import { ActivityType } from '@src/types'
import useFilterItem from '@src/hooks/useFilterItem'
import { List, ListItem } from '@mui/material'
import Activity_item from '@src/components/Activity_Item2'
type Props = {
    activityList: ActivityType[]
    selectedCourseId: string
    pos: number
    isLoading: boolean
  }
  
const Activity_list = ({activityList,selectedCourseId,pos,isLoading}:Props)=>{

    const filteredActivities = useFilterItem(
        activityList,
        selectedCourseId
      );
    console.log(filteredActivities,"From Activity_list");
    return (    
        <>
        <List sx={{bgcolor:'#eee',p:2,width:'50%'}} dense={true}>
        {filteredActivities.map((activity)=>
            <Activity_item activity={activity}></Activity_item>
        )}
        </List>
        </>
    )
}
export default Activity_list;