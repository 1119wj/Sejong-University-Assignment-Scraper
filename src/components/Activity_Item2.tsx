
import { format, formatDistanceToNowStrict, isValid } from 'date-fns'
import {ko} from 'date-fns/locale';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';
import { ListItem,ListItemAvatar,Avatar,ListItemText, ListItemButton } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import {ActivityType,Video,Assignment} from '@src/types/index';


type Props = {
    activity: Video|Assignment;
}

const Activity_item = ({activity}: Props)=>{
    
    const endAtDate = new Date(activity.endAt);
    const dDay =
    isValid(endAtDate) && formatDistanceToNowStrict(endAtDate, { addSuffix: true, locale: ko });
    let D_day : string = '기한없음';
    if (dDay != false){
        D_day = dDay;
    }
    return (
        <>
        <ListItem sx={{height:80}}>
              <ListItemAvatar>
                <Avatar sx={{bgcolor:red[500]}}>
                  {activity.hasSubmitted ? <ClearIcon/>:<CancelIcon sx={{color: red[500]}} />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={activity.sectionTitle}/>
              <ListItemText primary={activity.title} secondary={activity.courseTitle}/>
              <ListItemText primary={D_day} secondary={activity.endAt}/>
              <ListItemButton href={`https://ecampus.sejong.ac.kr/course/view.php?id=${activity.courseId}`}>
              <ArrowCircleRightOutlinedIcon/>
              </ListItemButton>
        </ListItem>
        </>
    )
}
export default Activity_item;