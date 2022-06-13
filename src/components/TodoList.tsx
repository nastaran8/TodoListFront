import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
}) => {
  return (
    <div className="container">
     <div  className="todos">
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
          </div>
      </div>
  );
};

export default TodoList;
