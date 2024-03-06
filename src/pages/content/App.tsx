import { Button, Modal, ThemeProvider, createTheme } from "@mui/material";
import Activity_item from "@src/components/Activity_Item";
import CustomModal from "@src/components/CustomModal";
import { ActivityData } from "@src/data/data";
import { useState } from "react";



export default function App() {
    const [isOpen , setIsOpen] = useState(false);

    const openModal = ()=> setIsOpen(true);
    const closeModal = ()=> setIsOpen(false);
    return (
      <>
        <Button sx={{position:"fixed", top: 0}} onClick={openModal}>Hi</Button>
        <CustomModal isOpen={isOpen} onClose={closeModal}></CustomModal>  
    </>
    )
  }