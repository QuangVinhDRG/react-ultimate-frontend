import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import UserPage from './pages/user.jsx'
import BookPage from './pages/book.jsx'
import TodoApp from './components/todo/TodoApp.jsx'
import ErrorPage from './pages/error.jsx'
import { AuthWrapper } from './components/context/AuthContext.jsx'
import PrivateRoute from './pages/private-route.jsx'
import 'nprogress/nprogress.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/book",
        element:
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  /* <App /> */
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  /* </React.StrictMode> */
)
