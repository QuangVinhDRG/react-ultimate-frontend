import "./components/todo/todo.scss"
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import { Outlet } from "react-router-dom"
import { getAccountAPI } from "./services/ApiService"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/context/AuthContext"
import { Spin } from "antd"
const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  // const delay = (miliSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, miliSeconds)
  //   })
  // }

  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    // await delay(3000)
    if (res.data) {
      // success 
      setUser(res.data.user)
      // console.log(">>> Check data: ", res.data)
    }
    setIsAppLoading(false)
  }
  return (
    <>
      {isAppLoading
        ?
        <div className="flex justify-center items-center h-screen">
          <Spin className="" />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>}
    </>
  )
}

export default App
