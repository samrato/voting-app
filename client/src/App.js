import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Results from './pages/Results'
import Elections from './pages/Elections'
import ElectionDetails from './pages/ElectionDetails'
import Candidates from './pages/Candidates'
import Congrats from './pages/Congrats'
import LogOut from './pages/LogOut'

const router =createBrowserRouter([
  {
    path :'/',
    element :<RootLayout/>,
    errorElement :<ErrorPage/>,
    children :[
          {
            index : true,
          element :<Login/>
          },
          {
            path :"register",
            element:<Register/>
          },
          {
            path :"results",
            element:<Results/>
          },
          {
            path :"election",
            element:<Elections/>
          },
          {
            path :"elections/:id",
            element:<ElectionDetails/>
          },
          {
            path :"election/:id/candidates",
            element:<Candidates/>
          },
          {
            path :"congrats",
            element:<Congrats/>
          },
          {
            path :"logout ",
            element:<LogOut/>
          },
    ]
  }
])




function App() {
  return (<RouterProvider router={router}/>);
}

export default App;
