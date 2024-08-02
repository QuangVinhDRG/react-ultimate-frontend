import React, { useContext, useState } from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { loginAPI } from '../services/ApiService';
import { AuthContext } from '../components/context/AuthContext';

const LoginPage = () => {
    const [loginForm] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Login successfully!")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            message.error("Login failed!")
        }
        setLoading(false)
    };
    return (
        <Row justify={'center'} className='mt-7'>
            <Col xs={24} md={16} lg={8}>
                <fieldset className='p-4 m-1 border border-gray-300 rounded-sm'>
                    <legend className='px-4 font-medium text-xl'>Đăng nhập</legend>
                    <Form
                        className='m-5'
                        form={loginForm}
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    type: 'email',
                                    message: 'Format is incorrect!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') loginForm.submit()
                            }} />
                        </Form.Item>
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <Button className='w-full py-5' type="primary" onClick={() => loginForm.submit()} loading={loading}>
                                    Login
                                </Button>
                            </Col>
                            <Col>
                                <Link className='text-blue-500 underline block text-right' to={"/"}>Go to home page <ArrowRightOutlined /></Link>
                            </Col>
                        </Row>
                        <span className="block text-center mt-5">Chưa có tài khoản? <Link className="text-blue-500 underline" to={"/register"}>Đăng ký</Link></span>
                    </Form>
                </fieldset>
            </Col>
        </Row>

    )
}
export default LoginPage