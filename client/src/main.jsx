import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import ErrorPage from './pages/error/ErrorPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetail'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import AuthorsPost from './pages/AuthorPost'
import Authors from './pages/Authors'
import CategoryPost from './pages/CategoryPost'
import UserProvider from './context/userContext'

const routes = createBrowserRouter([
  {
    path: "/", 
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      {index: true , element: <Home />},
      {path: "login", element: <LoginPage />},
      {path: "logout", element: <Logout />},
      {path: "register", element: <Register />},
      {path: "myposts/:id", element: <Dashboard />},
      {path: "user-profile/:id", element: <UserProfile/>},
      {path: "create-post", element: <CreatePost />},
      {path: "posts/:id", element: <PostDetails />},
      {path: "posts/:id/edit-post", element: <EditPost />},
      {path: "posts/:id/delete-post", element: <DeletePost />},
      {path: "posts/users/:id", element: <AuthorsPost />},
      {path: "authors", element: <Authors />},
      {path: "posts/categories/:category", element: <CategoryPost />},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
