import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Box, Stack } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Stack
      p={2}
      justifyContent={"space-between"}
      sx={{
        height: "100vh",
        width: "15vw",
        position:"sticky",
        borderRight: "1px solid lightgray",

      }}
    >
      <Stack spacing={1}>
        <Box>
          <Stack direction="row" gap="10px">
            <LocalLibraryIcon fontSize="large" />
            <Typography variant="h4" style={{ color: "red" }}>Library</Typography>
          </Stack>
          <Divider sx={{ mb: "10px", mt: "10px" }} />
        </Box>
        <Button component={Link} to={"/"} startIcon={<DashboardIcon />}>
          Dashboard
        </Button>
        <Button component={Link} to={"/books"} startIcon={<AutoStoriesIcon />}>
          Books
        </Button>
      </Stack>

      <Box sx={{ position: "sticky", bottom: 0 }}>
        <Button
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Stack>
  );
};

export default Sidebar;
