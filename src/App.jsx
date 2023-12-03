import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import UserContextProvider from './components/UserContextProvider'
import RequireAuth from './components/RequireAuth'
import Signup from './routes/Signup'
import Notes from './routes/Notes'
import CreateNote from "./routes/CreateNote";


const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />  
  },
  {
    path: '/',
    element: (
    <RequireAuth>
      <Home />
      </RequireAuth>
    ),
  },
  {
    path: '/signup',
    element: (
      <Signup />
    )
  },
  {
    path: '/notes',
    element: (
      <Notes />
    )
  },
  {
  path: '/create-note',
  element: (
    <CreateNote />
  )
  }
])

export default function App() {
return <UserContextProvider>
  <RouterProvider router={router} />
</UserContextProvider>
}
