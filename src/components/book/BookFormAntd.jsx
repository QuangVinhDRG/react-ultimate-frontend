import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { createBookAPI, handleUploadFile } from "../../services/ApiService"
import { useState } from "react"

const BookFormAntd = (props) => {
    const { isModalOpen, setIsModalOpen, loadBook } = props
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState("")


    const [createBookForm] = Form.useForm()

    const handleOnChangeFile = async (file) => {
        const resUpload = await handleUploadFile(file, "book")
        if (resUpload) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleCloseModal = () => {
        createBookForm.resetFields()
        setIsModalOpen(false)
    }

    const handleSubmitModal = () => {
        createBookForm.validateFields()
            .then(() => {
                createBookForm.submit()
                const bookData = createBookForm.getFieldsValue()
                handleCreate()
                setIsModalOpen(false)
                createBookForm.resetFields()
            })
            .catch(() => {
                setIsModalOpen(true)
            })
    }

    const handleCreate = async (imageFile, title, author, price, quantity, category) => {
        const resCreate = await createBookAPI(imageFile, title, author, price, quantity, category)
        if (resCreate?.data) {
            notification.success({
                message: "Create book successfully!!!"
            })
            await loadBook()
        } else {
            notification.error({
                message: `Create book error: ${JSON.stringify(resCreate.message)}`,
                duration: 2
            })
        }
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={handleCloseModal}
                title="Create Book (uncontrolled component)"
                onOk={handleSubmitModal}
            >
                <Form
                    form={createBookForm}
                    layout="vertical"
                >
                    <Form.Item
                        label="Title"
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter title!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name={"author"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter author!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name={"price"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter price!"
                            }
                        ]}
                    >
                        <InputNumber addonAfter="VND" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name={"quantity"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter quantity!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name={"category"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter category!"
                            }
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    label: "Arts",
                                    value: "Arts"
                                },
                                {
                                    label: "Business",
                                    value: "Business"
                                },
                                {
                                    label: "Comics",
                                    value: "Comics"
                                },
                                {
                                    label: "Cooking",
                                    value: "Cooking"
                                },
                                {
                                    label: "Entertainment",
                                    value: "Entertainment"
                                }
                            ]}
                        />
                    </Form.Item>
                </Form>
                <div>
                    <label htmlFor="thumbnail" className="cursor-pointer border border-gray-300 px-4 py-2 bg-gray-300">Choose thumbnail</label>
                    <Input
                        type="file"
                        accept="image/*"
                        hidden
                        id="thumbnail"
                        onClick={(event) => { event.target.value = null }}
                        onChange={(event) => handleOnChangeFile(event.target.files[0])} />
                    {preview && <img className="w-36 mt-3" src={preview} alt="" />}
                </div>
            </Modal>
        </>
    )
}
export default BookFormAntd