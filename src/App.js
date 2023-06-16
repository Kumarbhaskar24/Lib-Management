import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useAuth,AuthContextProvider } from "./context/AuthContext";
import HomePage from './components/Home';
import Login from './components/Login';
import {Navigate,createBrowserRouter,RouterProvider} from "react-router-dom";
const App=()=> {

  // const { currentUser } = useAuth();


  // const RequireAuth = ({ children }) => {
  //   return currentUser ? children : <Navigate to="/login" />;
  // };

  const router = createBrowserRouter([
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
      <RouterProvider router={router}>
      <AuthContextProvider>
        
      </AuthContextProvider>
      </RouterProvider>
    </div>
  );
};

export default App;
