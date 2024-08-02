import { Drawer } from "antd"

const BookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, rowData } = props
    return (
        <Drawer
            open={isDetailOpen}
            onClose={() => { setIsDetailOpen(false) }}
            width={500}
        >
            <p><span className="font-semibold">Id: </span>{rowData?._id}</p>
            <p><span className="font-semibold">Title: </span>{rowData?.mainText}</p>
            <p><span className="font-semibold">Author: </span>{rowData?.author}</p>
            <p><span className="font-semibold">Category: </span>{rowData?.category}</p>
            <p><span className="font-semibold">Price: </span>{rowData?.price}</p>
            <p><span className="font-semibold">Quantity: </span>{rowData?.quantity}</p>
            <p><span className="font-semibold">Sold: </span>{rowData?.sold}</p>
            <div className="size-28">
                <span className="font-semibold">Thumbnail: </span>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${rowData?.thumbnail}`} alt="" />
            </div>
        </Drawer>
    )
}
export default BookDetail