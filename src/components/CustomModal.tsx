import { Avatar, Box, Button, IconButton, Modal, Typography } from "@mui/material"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';


import useGetContents from '@src/hooks/useGetContents'
import CourseTabs from "@src/components/CourseTabs"
import Activity_list from "./Activity_list"
import { Refresh } from "@mui/icons-material";
import { formatDistanceToNowStrict, isValid } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
    isOpen: boolean
    onClose: () => void
  }
  
  const CustomModal = ({ isOpen, onClose }: Props) => {

    const [selectedCourseId, setSelectedCourseId] = useState('-1')
    const {
      data: { courseList, activityList, updateAt },
      progress,
      refetch,
      isLoading,
    } = useGetContents({ enabled: isOpen })
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: '90%',
      maxWidth:'1300px',
      height: '800px',
      bgcolor: "white", // Change to whatever color you want
      borderRadius: 2,
      boxShadow: 24,
      p: 4
    };
    const logo = chrome.runtime.getURL('/src/assets/img/main.png');
    console.log(activityList,"From Custom Modal");
    const updateAtDate = new Date(updateAt);
    console.log(updateAtDate, isValid(updateAtDate));
    return (
      <Modal open= {isOpen} onClose={onClose}>
        <Box sx={style}>
        
          <Box marginTop={'15px'} alignItems={'center'} display={'flex'} width={'100%'} height={'70px'} marginLeft={'40px'}>
            <Avatar sx={{marginLeft:'5px', width:'70px',height:'70px'}} alt="main-logo" src={logo}/>
            <Typography component='h2' variant="h4" sx={{color:'black', m:0 , p :2, fontWeight:'900',}}>세종대학교 과제알리미</Typography>
            <IconButton 
            aria-label='close' 
            onClick={onClose}
            sx={{position:'absolute', color:'#999', right:'8px',top:'8px'}}>
            <CloseIcon/>
            </IconButton>
          </Box>
          <Box height={'5px'}></Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'80%'} marginTop={'5px'}>
            <CourseTabs
              courseList={courseList}
              selectedCourseId={selectedCourseId}
              setSelectedCourseId={setSelectedCourseId}
            />
            <Activity_list activityList={activityList} 
            selectedCourseId={selectedCourseId}
            pos={progress}
            isLoading={isLoading}></Activity_list>
          </Box>
          <Button sx={{border:'none', color:'#797979',"&:focus":{
                outline:'none',
                border:'none'
              },
              marginTop:'5px',
              "&:hover":{fontWeight:'900', color:'#363535',border:'none',bgcolor:'#f5f1f2'},
              "&.Mui-selected": {
                outline: 'none',
                border: 'none',                                                                   
              },fontWeight:'700',}} variant="outlined" onClick={refetch} startIcon={<Refresh/>}>
          {isLoading
                ? '불러오는 중...'
                : `${
                    isValid(updateAtDate) &&
                    formatDistanceToNowStrict(updateAtDate, { addSuffix: true, locale: ko })
                  } 업데이트`}
          </Button>
          </Box>
      </Modal>
    )
}
export default CustomModal;