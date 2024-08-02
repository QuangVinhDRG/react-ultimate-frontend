import { Popconfirm, Table } from "antd";
import { useState } from "react";
import BookDetail from "./BookDetail";
import BookForm from "./BookForm";
import BookFormAntd from "./BookFormAntd";

const BookTable = (props) => {
    const { books, currentPage, setCurrentPage, pageSize, setPageSize, totalRecord, isModalOpen, setIsModalOpen, loadBook } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [rowData, setRowData] = useState()


    const handleOnChange = (pagination) => {
        if (pagination.current !== currentPage) {
            setCurrentPage(pagination.current)
        }
        if (+pagination.pageSize !== pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const dataSource = books

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{index + 1 + (currentPage - 1) * pageSize}</>
                )
            },
            key: 'STT',
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <>
                        <span className="border-r-2 border-[#d9d9d9] px-2">Edit</span>
                        <Popconfirm>
                            <span className="px-2">Delete</span>
                        </Popconfirm>
                    </>
                )
            },
            key: 'action',
        },
    ];
    return (
        <>
            <Table
                rowKey={"_id"}
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    showSizeChanger: true,
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalRecord
                }}
                onChange={handleOnChange}
                onRow={(record) => ({
                    onClick: () => {
                        setIsDetailOpen(true)
                        setRowData(record)
                        console.log(record)
                    }
                })}
            />
            <BookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                rowData={rowData}
            />
            {/* <BookForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}
            /> */}
            <BookFormAntd
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookTable