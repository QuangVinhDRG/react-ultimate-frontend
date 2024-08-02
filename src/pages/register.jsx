import { Input, Button, Form, message, notification, Row, Col } from "antd"
import { registerUserAPI } from "../services/ApiService"
import { Link, useNavigate } from "react-router-dom"
const RegisterPage = () => {
    const [registerForm] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        const res = await registerUserAPI(values.username, values.email, values.password, values.phoneNumber)
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Register successfully!"
            })
        } else {
            notification.error({
                message: "Register user",
                description: JSON.stringify(res.message)
            })
        }
        navigate("/login")
    }
    return (
        <Row justify={"center"} className="mt-7">
            <Col xs={24} md={16} lg={8}>
                <fieldset className="p-4 m-1 border border-gray-300 rounded-sm">
                    <legend className="font-medium text-xl px-4">Đăng ký</legend>
                    <Form className="mx-auto"
                        layout="vertical"
                        form={registerForm}
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: 'Wrong Format',
                                },
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
                            <Input.Password />
                        </Form.Item>
                        <Button onClick={() => { registerForm.submit() }} className="w-full py-5" type="primary">Register</Button>
                        {/* <Button type="primary" onClick={() => {
                    const getValue = registerForm.getFieldsValue()
                    console.log(getValue)
                    registerForm.setFieldsValue({
                        email: "v@gmail.com",
                        username: "vinh"
                    })
                }}>Test</Button> */}
                    </Form >
                    <span className="block text-center mt-5">Đã có tài khoản? <Link className="text-blue-500 underline" to={"/login"}>Đăng nhập</Link></span>
                </fieldset>
            </Col>
        </Row>

    )
}
export default RegisterPage