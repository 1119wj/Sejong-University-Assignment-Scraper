
import { differenceInHours, format, formatDistanceToNowStrict, isValid } from 'date-fns'
import {ko} from 'date-fns/locale';
import { ListItem,ListItemAvatar,Avatar,ListItemText, ListItemButton, Box, Typography } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import {ActivityType,Video,Assignment} from '@src/types/index';
import { keyframes } from '@mui/system';


type Props = {
    activity: Video|Assignment;
}

const Activity_item = ({activity}: Props)=>{
    console.log(activity.title, "From Activity_item");
    const endAtDate = new Date(activity.endAt);
    const now = new Date();
    const hoursDiff = differenceInHours(endAtDate,now);
    const vibration = keyframes`
    0% {
      transform: rotate(1deg);
    }
    100% {
      transform: rotate(-1deg);
    }
    `;
    const dDay =
    isValid(endAtDate) && formatDistanceToNowStrict(endAtDate, { addSuffix: true, locale: ko });
    let D_day : string = '기한없음';
    if (dDay != false){
        D_day = dDay;
    }

    const ShortCourseTitle = activity.courseTitle.split('(')[0];
    const openInNewTab = (url:string) =>{
      window.open(url,"_blank","noreferrer");
    };
    return (
        <>
        <Box borderRadius={2} display={'flex'} justifyContent={'space-between'} sx={{minHeight:'80px', maxHeight:'120px',
         alignItems:'center', 
         boxShadow:'2', 
         bgcolor:'#f5f5f5', 
         marginBottom:'5px',
         ...(dDay !== false &&  hoursDiff <= 24 && hoursDiff >0 &&{
          animation: `${vibration} 0.2s infinite`
         })
         }}>
        <ListItem>
          {/*<Box display={'flex'} width={'100%'} height={'80'} boxShadow={2} borderRadius={2} bgcolor={'#f5f5f5'}>
              {/* <ListItemAvatar>
                <Avatar sx={{bgcolor:red[500]}}>
                  {activity.hasSubmitted ? <ClearIcon/>:<CancelIcon sx={{color: red[500]}} />}
                </Avatar>
              </ListItemAvatar> */}
              <Box sx={{marginLeft:'15px',textAlign:'center',}}>
                <Typography>{activity.sectionTitle}</Typography>
              </Box>
              <Box width={'200px'} margin={'15px'}>
                <Typography sx={{fontWeight:'Bold !important',fontSize:'15px' }}>{activity.title}</Typography>
                <Typography sx={{fontSize:'12px', color:'#8f8e8e'}} >{ShortCourseTitle}</Typography>
              </Box>
              <Box width={'150px'} margin={'15px'}>
                <Typography>{D_day ==='기한없음' ? D_day: D_day + " 마감"}</Typography>
                <Typography sx={{fontSize:'12px', color:'#8f8e8e'}}>{activity.endAt}</Typography>
              </Box>
              {/* <ListItemText sx={{marginRight:'5px', width:'150px'}} primary={D_day} secondary={activity.endAt}/> */}
              <ListItemButton sx={{display:'flex',justifyContent:'center', marginLeft:'20px', flexGrow:'0', width:'60px',height:'60px',p:'0',"&:hover":{color:'#b62724'}}} onClick={()=> openInNewTab(`https://ecampus.sejong.ac.kr/course/view.php?id=${activity.courseId}`)}>
                <ArrowCircleRightOutlinedIcon/>
              </ListItemButton>
        </ListItem>
        </Box>
        </>
    )
}
export default Activity_item;