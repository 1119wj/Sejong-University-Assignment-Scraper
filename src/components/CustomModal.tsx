import { Box, DialogTitle, Divider, IconButton, Modal } from "@mui/material"
import { useState } from "react"

import useGetContents from '@src/hooks/useGetContents'
import CourseTabs from "@src/components/CourseTabs"
import Activity_list from "./Activity_list"

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
      height: 1000,
      bgcolor: "white", // Change to whatever color you want
      borderRadius: 2,
      boxShadow: 24,
      p: 4
    };
    console.log(activityList,"From Custom Modal");
    return (
      <Modal open= {isOpen} onClose={onClose}>
        <Box sx={style}>
          <header>
            <DialogTitle sx={{m:0 , p :2, display:'flex'}}>세종대 Tool</DialogTitle>
            <IconButton 
            aria-label='close' 
            onClick={onClose}
            sx={{right:'8',top:'8'}}
            >
            </IconButton>
          </header>
          <Box display={'flex'}>
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
          </Box>
      </Modal>
    )
}
export default CustomModal;