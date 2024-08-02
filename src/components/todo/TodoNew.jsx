import { useState } from "react";

const TodoNew = (props) => {

    // const valueInput = "Eric";
    // useState hook
    const [valueInput, setValueInput] = useState("Eric"); // destructuring array

    const { addNewTodo } = props;

    // addNewTodo("eric")
    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }
    return (
        <div className="todo-new">
            <input className="border border-gray-300" onChange={(event) => handleOnChange(event.target.value)} type="text" value={valueInput} />
            <button className="bg-blue-500 px-4 py-2 text-white" onClick={handleClick}>Add</button>
            {/* <div>
                My input is {valueInput}
            </div> */}
        </div>
    )
}
export default TodoNew;