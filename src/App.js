import './App.css';
import HomePage from './components/Home';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
function App() {


  // const router = createBrowserRouter([
  //   {
  //     path:"/home",
  //     element:<HomePage/>
  //   }
  // ]);
  return (
    <div >
      <HomePage/>
    </div>
  );
}

export default App;
