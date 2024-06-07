import { Avatar, Fab } from "@mui/material";
import { useState } from "react";
import CustomModal from "@src/components/CustomModal";

import { ActivityData } from "@src/data/data"; // for test



export default function App() {
    const [isOpen , setIsOpen] = useState(false);
    const logo = chrome.runtime.getURL('/src/assets/img/main.png');
    const openModal = ()=> setIsOpen(true);
    const closeModal = ()=> setIsOpen(false);
    return (
      <>
        <Fab sx={{
          position: "fixed", 
          bottom: '70px',
          right: '10px',
          bgcolor: '#f9f8f8',
          "&:hover": {
    // Fab에 대한 :hover 스타일
          border: '2px solid #b62724'
        },
          "&:focus":{
            outline:'none'
          },
          "&.Mui-selected": {
            outline: 'none',                                                                   
          }
          }} onClick={openModal}>
          <Avatar className="avatar-hover" alt="main-logo" src={logo}/>
        </Fab>
        <CustomModal isOpen={isOpen} onClose={closeModal}></CustomModal>  
    </>
    )
  }