import { useEffect, useState } from "react";
import UserForm from "../components/user/UserForm"
import UserTable from "../components/user/UserTable"
import { fetchAllUserAPI } from "../services/ApiService";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false)

    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        setLoadingTable(true)
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)
    }
    return (
        <div className="mb-[150px]">
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadingTable={loadingTable}
            />
        </div>
    )
}
export default UserPage