import { Link } from "react-router-dom";
import { Avatar, Card, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EastIcon from "@mui/icons-material/East";

let imageStyle = {
    height: "100vh",
    width: "100vw",
    backgroundImage:
      'url("https://c0.wallpaperflare.com/preview/932/260/985/bible-biblia-book-book-bindings.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
  };


const Dashboard = ({ booksData}) => {
  return (
    <div  style={imageStyle}>
    <Box p={2} ml={2}>
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" sx={{ mb: "20px",mt:"20px", mr:"180px" }}>
                Dashboard
        </Typography>
    </div>

      <Stack direction={"row"} spacing={2} justifyContent="center">
        <Card sx={{ p: "20px", width: "200px",mr:"180px"}}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            sx={{ gap: "20px" }}
          >
            <Avatar sx={{ bgcolor: "purple" }}>
              <AutoStoriesIcon fontSize="large" />
            </Avatar>
            <Stack>
              <Typography variant="h5" >BOOKS</Typography>
              <Typography variant="h5">{booksData.length}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mb: "10px", mt: "10px" }} />
          <Stack
            component={Link}
            to="/books"
            direction="row"
            sx={{ textDecoration: "none" }}
          >
            <Typography>See all books</Typography>
            <EastIcon />
          </Stack>
        </Card>
      </Stack>
    </Box>
    </div>
  );
};

export default Dashboard;
