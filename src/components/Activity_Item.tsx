import type { ActivityType } from '@src/types'
import {Card,Grid, IconButton, Typography} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ClearIcon from '@mui/icons-material/Clear';
import { format, formatDistanceToNowStrict, isValid } from 'date-fns'
import {ko} from 'date-fns/locale'
import { Label } from '@mui/icons-material';
import { useState } from 'react';
import { red } from '@mui/material/colors';
type Props = {
    activity: ActivityType
}

const Activity_item1 = ({activity}: Props)=>{
    
    const [onAlarm,setOnAlarm] = useState(true);
    const alarmHandler = ()=> setOnAlarm(!onAlarm);
    const endAtDate = new Date(activity.endAt);
    const dDay =
    isValid(endAtDate) && formatDistanceToNowStrict(endAtDate, { addSuffix: true, locale: ko });
    return (
        <>
        <Card>
            <Grid container spacing={3}>
                {activity.hasSubmitted ? 
                    <CheckCircleIcon color='success'/> :<ClearIcon sx={{color : red[100]}}></ClearIcon>
                }
                <Grid item xs={10}>
                    <Typography>{activity.title}</Typography>
                    <Typography>{activity.courseTitle}</Typography>
                    </Grid >
                <Grid item xs={1}>
                    <Typography>{dDay ? (<> {dDay + ' 마감'}
                    </>):'기한없음'}</Typography>
                    <Typography>{isValid(endAtDate) && `~${format(endAtDate, 'yyyy.MM.dd HH:mm')}`}</Typography>
                </Grid >
                <IconButton onClick={alarmHandler}>
                    {
                        onAlarm ?
                        <AccessAlarmsIcon color='action'/>
                        :
                        <AccessAlarmsIcon color='primary'/>
                    }
                </IconButton>
                <Label>Alarm</Label>
            </Grid>
        </Card>
        </>
    )
}

export default Activity_item1
