import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, notification } from 'antd';
import UpdateUserModal from './UpdateUserModal';
import { useState } from 'react';
import ViewUserDetail from './VỉewUserDetail';
import { deleteUserAPI } from '../../services/ApiService';
const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize, loadingTable } = props
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [detailData, setDetailData] = useState(null)

    const handleDeleteUser = async (_id) => {
        const res = await deleteUserAPI(_id)
        if (res?.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User Successfully",
                duration: 1
            })
            await loadUser()
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (pageSize * (current - 1))}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href="#" onClick={() => {
                        setIsDetailOpen(true)
                        setDetailData(record)
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-3">
                    <EditOutlined
                        className='text-xl text-yellow-500 cursor-pointer'
                        onClick={() => {
                            setIsModalUpdateOpen(true)
                            setDataUpdate(record)
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className='text-xl text-red-500 cursor-pointer' />
                    </Popconfirm>
                </div>
            ),
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log(pagination)
        if (pagination && pagination.current) {
            if (+current != pagination.current) {
                setCurrent(+pagination.current)
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pageSize != pagination.pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }

    return (
        <div className='px-20'>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                loading={loadingTable}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (
                                <div>
                                    {range[0]} - {range[1]} trên {total}
                                </div>
                            )
                        },
                    }
                }
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                detailData={detailData}
                setDetailData={setDetailData}
                loadUser={loadUser}
            />
        </div>
    )
}

export default UserTable