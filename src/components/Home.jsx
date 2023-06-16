import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import EastIcon from "@mui/icons-material/East";
import { Avatar, Typography, Card, Divider } from "@mui/material";
import { AccountCircle, LibraryBooks } from "@mui/icons-material";
const HomePage = () => {
    return (
        <Box p={2} ml={2}>
            {
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h3" textAlign="center" sx={{mb:"20px"}}>
                        Home Page
                    </Typography>
                </Stack>

            }
            {
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Card sx={{ p: "20px", width: "250px" }}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-around"
                            sx={{ gap: "20px" }}
                        >
                            <Avatar sx={{ bgcolor: "green", width: 95, height: 95 }}>
                                <AccountCircle fontSize="large" />
                            </Avatar>
                            <Stack>
                                <Typography variant="overline" style={{ fontSize: "20px" }}>
                                    ADMIN LOGIN
                                </Typography>
                                <Typography variant="h5"></Typography>
                            </Stack>
                        </Stack>
                        <Divider sx={{ mb: "10px", mt: "10px" }} />
                        <Stack
                            // component={Link}
                            // to="/"
                            direction="row"
                            sx={{ textDecoration: "none" }}
                        >
                            <Typography>Login to Admin Dashboard</Typography>
                            <EastIcon />
                        </Stack>
                    </Card>
                    <Card sx={{ p: "20px", width: "250px" }}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-around"
                            sx={{ gap: "20px" }}
                        >
                            <Avatar sx={{ bgcolor: "orange", width: 100, height: 100 }}>
                                <LibraryBooks fontSize="large" />
                            </Avatar>
                            <Stack>
                                <Typography variant="overline" style={{ fontSize: "20px" }}>
                                    LIBRARY BOOKS
                                </Typography>
                                <Typography variant="h5"></Typography>
                            </Stack>
                        </Stack>
                        <Divider sx={{ mb: "10px", mt: "10px" }} />
                        <Stack
                            // component={Link}
                            // to="/Library"
                            direction="row"
                            sx={{ textDecoration: "none" }}
                        >
                            <Typography>Go to Library</Typography>
                            <EastIcon />
                        </Stack>
                    </Card>
                </Stack>
            }
        </Box>
    )
}
export default HomePage;