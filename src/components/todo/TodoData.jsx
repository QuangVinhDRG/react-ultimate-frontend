const TodoData = (props) => {
    // props là một biến object
    const { name, age, data, todoList, deleteTodo } = props; // Object destructuring

    const handleClick = (id) => {
        deleteTodo(id)
    }
    return (
        <div className="todo-data">
            {/* <div>My name is {name}</div> */}
            {todoList.map((item, index) => {
                return (
                    <div className="flex justify-between" key={item.id}>
                        {item.name}
                        <button className="cursor-pointer bg-red-500 text-white px-2 py-1 hover:opacity-75" onClick={() => handleClick(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}
export default TodoData;