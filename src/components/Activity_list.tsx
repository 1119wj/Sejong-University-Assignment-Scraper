import { Box, List, Typography, keyframes, makeStyles } from '@mui/material'
import { ActivityType } from '@src/types'
import useFilterItem from '@src/hooks/useFilterItem'
import Activity_item from '@src/components/Activity_Item2'
import { ActivityData } from '@src/data/data' // for test



type Props = { // pos -> 현재 fetch 진행률 후에 Loading component 업데이트를 위함
  //isLoading -> for Loading Component
  activityList: ActivityType[]
  selectedCourseId: string
  isLoading: boolean
}

const showImage = keyframes`
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Activity_list = ({ activityList, selectedCourseId, isLoading }: Props) => {
  const filteredActivities = useFilterItem(
    activityList, // test 시 ActivityData 넣고 테스트, 원본은 activityList
    selectedCourseId
  );

  const GoodImage = chrome.runtime.getURL('/src/assets/img/file.png');
  const BadImage = chrome.runtime.getURL('/src/assets/img/file2.png');
  return (
    <>
      <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: -10, pointerEvents: 'none' }}>
          <Box sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(100%,-50%)',
            backgroundImage: `url(${filteredActivities.length === 0 ? GoodImage : BadImage})`,
            backgroundSize: 'cover',
            width: '150px',
            height: '150px',
            animation: `${showImage} 4s ease-in-out`,
            zIndex: 1000,
          }}>
          </Box>
        </Box>
      <List sx={{
        height: '90%',
        overflow: 'auto',
        bgcolor: '#eee',
        p: 2,
        width: '50%',
        marginBottom: '20px',
        "&::-webkit-scrollbar": { color: '#8f8e8e', width: 0.4 },
        "&::-webkit-scrollbar-thumb": { width: 1, bgcolor: '#bbb' }
      }} dense={true}>
        {filteredActivities.length === 0 ? (
          <Typography>진행 중인 과제가 없습니다.</Typography>
        ) : (
          filteredActivities.map((activity) =>
            <Activity_item key={activity.id} activity={activity}></Activity_item>
          )
        )}
      </List>
    </>
  )
}

export default Activity_list;
