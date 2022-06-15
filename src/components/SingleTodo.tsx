import React, { useEffect } from "react";
import {AiFillDelete } from "react-icons/ai";
import { Todo } from "../models/models";
import axios from "axios";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({todo, todos, setTodos }) => {
 
  useEffect(() => {
  }, []);


  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(({data}) => {
    setTodos(data);
  });
  };

  const handleDone = (id: number,value:boolean) => {
   let data = {
    status: value
   }
    axios.patch(`http://localhost:5000/tasks/${id}`,data).then(({data}) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: data.status } : todo
        )
      );
    });
    
  };
 

  return (
    <>
      {todo.status ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
             <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <input type="checkbox" onChange={(e) => handleDone(todo.id,e.target.checked)} defaultChecked={todo.status}/>
          </div>
          </>
  );
};

export default SingleTodo;
