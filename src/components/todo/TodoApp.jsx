import { useState } from "react";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import reactLogo from "../../assets/react.svg"

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])
    const hoidanit = "Eric";
    const age = 25;
    const data = {
        address: "hanoi",
        country: "vietnam"
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 100),
            name: name
        }

        setTodoList([...todoList, newTodo])
    }

    const deleteTodo = (id) => {
        const newTodo = todoList.filter(item => item.id !== id)
        setTodoList(newTodo)
    }
    return (

        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew addNewTodo={addNewTodo} />
            {/* {todoList.length > 0 &&
      <TodoData name={hoidanit} age={age} data={data} todoList={todoList} />
    }
    {todoList.length === 0 &&
      <div className="todo-image">
        <img src={reactLogo} alt="" />
      </div>
    } */}
            {todoList.length > 0 ?
                <TodoData
                    name={hoidanit}
                    age={age}
                    data={data}
                    todoList={todoList}
                    deleteTodo={deleteTodo} />
                :
                <div className="todo-image">
                    <img src={reactLogo} alt="" />
                </div>
            }
        </div>
    )
}
export default TodoApp;