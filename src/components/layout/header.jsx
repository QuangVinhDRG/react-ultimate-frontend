import { Menu, message } from "antd";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AliwangwangFilled, AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutAPI } from "../../services/ApiService";

const Header = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["user", "book"]
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }
    }, [location])
    console.log("Check location: ", location)

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            localStorage.removeItem('access_token')
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout success!")
            navigate("/")
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/user"}>User</Link>,
            key: 'user',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/book"}>Book</Link>,
            key: 'book',
            icon: <BookOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />
        }] : [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <div onClick={() => handleLogout()}>Logout</div>,
                    key: 'logout'
                }
            ]
        }]),
    ];

    const [current, setCurrent] = useState('home');
    return (
        <Menu
            onClick={(event) => { setCurrent(event.key) }}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}
export default Header;