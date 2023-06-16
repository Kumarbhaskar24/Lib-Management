import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useAuth,AuthContextProvider } from "./context/AuthContext";
import HomePage from './components/Home';
import { Box, Stack } from "@mui/system";
import Login from './components/Login';
import Sidebar from "./components/Sidebar";
import {Navigate,Outlet,createBrowserRouter,RouterProvider} from "react-router-dom";
const App=()=> {

   const { currentUser } = useAuth();


  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const Layout = () => {
    return (
      <Stack direction={"row"}>
        <Box>
          <Sidebar />
        </Box>
        <Box sx={{ flex: 6 }}>
          <Outlet />
        </Box>
      </Stack>
    );
  };

  const router = createBrowserRouter([
    {
      path:"/",
      element:(<RequireAuth><Layout/></RequireAuth>)
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/home",
      element:<HomePage/>
    },
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
  ]);
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
