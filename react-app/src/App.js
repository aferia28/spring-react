import React, {Fragment, useState, useRef, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

const LOCALSTORAGEKEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([{id: 1, task: "Task 1", completed: false}]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY));
        if(storedTodos) setTodos(storedTodos);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(todos))
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos]
        const todo = newTodos.find((el) => el.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const getUncompletedTasks = () => {
        return todos.filter((el) => !el.completed)
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task: task, completed:false}]
        });

        todoTaskRef.current.value = null;
    };
    
    const handleTodoDelete = () => {
        const completedTasks = todos.filter((el) => !el.completed);
        setTodos(completedTasks);
    };

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="New task"/>
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleTodoDelete}>-</button>
            <div>There {getUncompletedTasks().length > 1 ? "are" : "is"} {getUncompletedTasks().length} tasks to completed</div>
        </Fragment>
    )
}