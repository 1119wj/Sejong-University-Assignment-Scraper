import { Avatar, Box, Card, Grid, ListItemButton, Typography } from "@mui/material"



export default function Popup() {
    const logo = chrome.runtime.getURL('/src/assets/img/main.png');
    const openInNewTab = (url:string) =>{
      window.open(url,"_blank","noreferrer");
    };
    return (
      <>
      <Box color={'#f4f4f4'} fontWeight={'900'} p={'10px'} alignItems={'center'} width={'250px'} height={'250px'} bgcolor={'#c79091'}>
          <ListItemButton onClick={()=>openInNewTab('https://ecampus.sejong.ac.kr/')}>
            <Avatar src={logo}></Avatar>
            <Typography>집현캠퍼스</Typography>
          </ListItemButton>
          <ListItemButton onClick={()=>openInNewTab('https://portal.sejong.ac.kr/jsp/login/loginSSL.jsp?rtUrl=portal.sejong.ac.kr/comm/member/user/ssoLoginProc.do')}>
            <Avatar src={logo}></Avatar>
            <Typography>학사정보시스템</Typography>
            </ListItemButton>
          <ListItemButton onClick={()=>openInNewTab('https://do.sejong.ac.kr/')}>
            <Avatar src={logo}></Avatar>
            <Typography>세종대학교 두드림</Typography>
          </ListItemButton>
          <ListItemButton onClick={()=>openInNewTab('http://classic.sejong.ac.kr/')}>
            <Avatar src={logo}></Avatar>
            <Typography>대양휴머니티칼리지</Typography>
          </ListItemButton>
      </Box>
    </>
    )
  }