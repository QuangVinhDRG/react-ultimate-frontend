import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAPI, updateUserAvatarAPI } from '../../services/ApiService';
const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, detailData, setDetailData, loadUser } = props

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isUploadSuccess, setIsUploadSuccess] = useState(false)


    const closeDrawer = () => {
        setIsDetailOpen(false)
        setDetailData(null)
    }
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleUpdateUserAvatar = async () => {
        // step 1
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //step 2
            const resUpdateAvatar = await updateUserAvatarAPI(detailData._id, detailData.fullName, detailData.phone, newAvatar)
            if (resUpdateAvatar.data) {
                setIsUploadSuccess(true)
                closeDrawer()
                await loadUser()
                notification.success({
                    message: "Update Avatar",
                    description: "Update Successfully"
                })
            } else {
                notification.error({
                    message: "Update Avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            //fail
            notification.error({
                message: "Upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
        console.log("res upload: ", resUpload)
    }

    return (
        <Drawer title="User Detail" onClose={closeDrawer} open={isDetailOpen}>
            {detailData ? <>
                <p><b>Full Name: </b>{detailData.fullName}</p>
                <p><b>Email: </b>{detailData.email}</p>
                <p><b>Phone Number: </b>{detailData.phone}</p>
                <p><b>Role: </b>{detailData.role}</p>
                <div className='mb-5 w-[150px] h-[150px]'>
                    <img className='w-full h-full object-contain' src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${detailData.avatar}`} alt="" />
                </div>
                <div>
                    <label className='cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md' htmlFor="btnUpload">Upload Avatar</label>
                    <input
                        type="file"
                        id='btnUpload'
                        accept='image/*'
                        hidden
                        // onChange={handleOnChangeFile}
                        onChange={(event) => { handleOnChangeFile(event) }}
                    />
                </div>
                {preview && !isUploadSuccess &&
                    <>
                        <div className='mb-5 w-[150px] h-[150px]'>
                            <img className='w-full h-full object-contain' src={preview} alt="" />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleUpdateUserAvatar}
                        >
                            Save
                        </Button>
                    </>
                }
            </>
                :
                <p>Không có dữ liệu</p>}
        </Drawer>
    )
}

export default ViewUserDetail;