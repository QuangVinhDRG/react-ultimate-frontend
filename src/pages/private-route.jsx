import { useContext } from "react"
import { AuthContext } from "../components/context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import { Button, Result } from "antd"

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext)
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        // <Navigate to="/login" />
        <Result
            status={403}
            title='Unauthorized!'
            subTitle={"Must be logged in to access!"}
            extra={<Button type="primary">
                <Link to={"/login"}>
                    <span>Go to Login</span>
                </Link>
            </Button>}
        />
    )
}

export default PrivateRoute