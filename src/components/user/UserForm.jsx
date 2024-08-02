import Input from "antd/es/input/Input";
import { Button, Modal, notification } from "antd";
import { useState } from "react";
import axios from "axios";
import { createUserAPI } from "../../services/ApiService";

const UserForm = (props) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { loadUser } = props

    const handleSubmit = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber)
        if (res?.data) {
            notification.success({
                message: "Create user",
                description: "Create user successfully!!!",
                duration: 1
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
        resetAndCloseModal();
        setIsModalOpen(false);
    }

    const resetAndCloseModal = () => {
        setFullName("")
        setPassword("")
        setEmail("")
        setPhoneNumber("")
    }
    return (
        <div className="mb-12">
            <div>
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={() => { setIsModalOpen(true) }}
                        type="primary">Create user</Button>
                </div>
                <Modal
                    title="Create a User"
                    open={isModalOpen}
                    onOk={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    maskClosable={false}
                    okText={"Create"}
                >
                    <div className="mx-auto w-[90%]">
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div className="mx-auto w-[90%]">
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div className="mx-auto w-[90%]">
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </div>
                    <div className="mx-auto w-[90%]">
                        <span>Phone number</span>
                        <Input
                            value={phoneNumber}
                            onChange={(event) => { setPhoneNumber(event.target.value) }}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default UserForm;