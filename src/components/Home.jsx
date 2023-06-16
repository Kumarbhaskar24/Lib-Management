import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {Box,Stack} from "@mui/system";
import {Avatar, Typography,Card,Divider} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
const HomePage =()=>{
    return (
        <Box p={2} ml={2}>
            {
               <Stack direction="row" alignItems="center" justifyContent="space-between" >
                <Typography>
                    Home Page
                </Typography>


               </Stack>
            
            }
            {
               <Stack
               direction="row"
               spacing={2}
               alignItems={"center"}
               justifyContent={"center"}
               >
                <Card sx={{p:"20px",width:"250px"}}>
                <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    sx={{gap:"20px"}}
                >

                <Avatar sx={{bgcolor: "green",width:95,height:95}}>
                    <AccountCircle fontSize="large"/>
                </Avatar>
                <Stack>
                    <Typography varient="overline" style={{fontSize:"20px"}}>
                    ADMIN LOGIN
                    </Typography>
                </Stack>
                </Stack>
                <Divider sx={{mb:"10px",mt:"10px"}}/>
                <Stack 
                // component={Link}
                // to="/"
                direction="row"
                sx={{textDecoration:"none"}}
                >
                    <Typography>
                        Login To Admin DashBoard
                    </Typography>
                </Stack>
                </Card>

               </Stack> 
            }
        </Box>
    )
}
export default HomePage;