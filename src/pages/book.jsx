import { Button } from "antd"
import BookTable from "../components/book/BookTable"
import { useEffect, useState } from "react"
import { fetchAllBookAPI } from "../services/ApiService"
import "../styles/book.scss"

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalRecord, setTotalRecord] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        loadBook()
    }, [currentPage, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(currentPage, pageSize)
        if (res.data) {
            setBooks(res.data.result)
            // console.log(res.data)
            setCurrentPage(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotalRecord(res.data.meta.total)
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between mb-3">
                <span className="font-semibold text-xl">Table Book</span>
                <Button type="primary"
                    onClick={() => { setIsModalOpen(true) }}
                >
                    Create Book
                </Button>
            </div>
            <BookTable
                books={books}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalRecord={totalRecord}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}
            />
        </div>
    )
}
export default BookPage