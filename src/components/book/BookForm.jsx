import { Input, InputNumber, message, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, fetchAllBookAPI, handleUploadFile } from "../../services/ApiService"

const BookForm = (props) => {
    const { isModalOpen, setIsModalOpen, loadBook } = props
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [preview, setPreview] = useState("")

    const handleOnChangeFile = async (file) => {
        const resUpload = await handleUploadFile(file, "book")
        if (resUpload) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
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

    const handleOnCloseModal = () => {
        setTitle("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setImageFile("")
        setPreview(null)
        setIsModalOpen(false)
    }
    return (
        <>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    handleOnCloseModal()
                }}
                onOk={() => {
                    handleCreate(imageFile.name, title, author, price, quantity, category)
                    handleOnCloseModal()
                }}
                title="Book Form"
            >
                <div>
                    <label htmlFor="title">Title</label>
                    <Input value={title} className="w-full mb-2" placeholder="Enter title" id="title" onChange={(event) => { setTitle(event.target.value) }} />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <Input value={author} className="w-full mb-2" placeholder="Enter author" id="author" onChange={(event) => { setAuthor(event.target.value) }} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <InputNumber value={price} className="w-full mb-2" placeholder="Enter price" addonAfter="VND" id="price" onChange={(event) => { setPrice(event) }} />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <InputNumber value={quantity} className="w-full mb-2" placeholder="Enter quantity" id="quantity" onChange={(event) => { setQuantity(event) }} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <Select
                        id="category"
                        value={category}
                        onChange={(event) => { setCategory(event) }}
                        className="w-full mb-6"
                        placeholder="Select category"
                        options={[
                            {
                                value: 'Arts',
                                label: 'Arts',
                            },
                            {
                                value: 'Business',
                                label: 'Business',
                            },
                            {
                                value: 'Comics',
                                label: 'Comics',
                            },
                            {
                                value: 'Cooking',
                                label: 'Cooking',
                            },
                            {
                                value: 'Entertainment',
                                label: 'Entertainment',
                            },
                            {
                                value: 'History',
                                label: 'History',
                            },
                            {
                                value: 'Music',
                                label: 'Music',
                            },
                            {
                                value: 'Sports',
                                label: 'Sports',
                            },
                            {
                                value: 'Teen',
                                label: 'Teen',
                            },
                            {
                                value: 'Travel',
                                label: 'Travel',
                            },
                        ]}
                    />
                </div>
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
export default BookForm