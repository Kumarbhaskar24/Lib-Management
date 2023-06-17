import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";
import HomePage from './components/Home';
import Books from "./components/Books";
import Dashboard from "./components/Dashboard";
import UserBooks from "./components/userBooks";
import AddBookForm from "./components/AddBook";
import { Box, Stack } from "@mui/system";
import Login from './components/Login';
import Sidebar from "./components/Sidebar";
import {Navigate,Outlet,createBrowserRouter,RouterProvider} from "react-router-dom";

const App=()=> {
  
   const { currentUser } = useAuth();
   const [booksData, setBooksData] = useState([]);

   useEffect(() => {
    async function firestoreData() {
      let tempBooks = [];
      try {
        const q1 = query(collection(db, "books"), orderBy("bookId"));
        const querySnapshot2 = await getDocs(q1);
        querySnapshot2.forEach((doc) => {
          tempBooks.push(doc.data());
        });
      } catch (err) {
        console.log(err);
      }
      setBooksData(tempBooks);
    }
    firestoreData();
  }, []);



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
      element:(<RequireAuth><Layout/></RequireAuth>),
      children: [{path: "/",element: (
        <Dashboard booksData={booksData}/>
      ),
    },
    {
      path: "/books",
      element: <Books booksData={booksData} setBooksData={setBooksData} />,
    },
  ],
    },
    {
      path: "*",
      element: <Navigate to="/home"/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/library",
      element: <UserBooks booksData={booksData} setBooksData={setBooksData} />,
    },
    {
      path: "/addbooks",
      element: <AddBookForm />,
    },
    {
      path:"/home",
      element:<HomePage/>
    },

  ]);
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
