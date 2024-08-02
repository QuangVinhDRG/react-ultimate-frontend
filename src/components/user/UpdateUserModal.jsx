import Input from "antd/es/input/Input";
import { Button, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from "../../services/ApiService";

const UpdateUserModal = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props
    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    // next data != prev data => recall useEffect
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhoneNumber(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmit = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber)
        if (res?.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully!!!",
                duration: 1
            })
            // await loadUser();
        } else {
            notification.error({
                message: "Update create user",
                description: JSON.stringify(res.message)
            })
        }
        resetAndCloseModal();
        setIsModalUpdateOpen(false);
    }

    const resetAndCloseModal = () => {
        setId("")
        setFullName("")
        setPhoneNumber("")
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={handleSubmit}
            onCancel={() => setIsModalUpdateOpen(false)}
            maskClosable={false}
            okText={"Save"}
        >

            <div className="mx-auto w-[90%]">
                <span>Id</span>
                <Input
                    value={id}
                    disabled
                />
            </div>
            <div className="mx-auto w-[90%]">
                <span>FullName</span>
                <Input
                    value={fullName}
                    onChange={(event) => { setFullName(event.target.value) }}
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
    )
}
export default UpdateUserModal;