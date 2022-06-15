import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {AiOutlineSearch } from "react-icons/ai";
import { Todo } from "./models/models";
import axios from "axios";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [search, setSearch] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      let data = {
        todo:todo
      };
      axios.post(`http://localhost:5000/tasks`,data).then(({ data }) => {
        setTodos([...todos, data]);
        setTodo("");
      });
    }
  };
 

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  const choosen = todos.filter(
   (item) =>
   item.todo.includes(search)
 );
 setTodos(choosen);
 setSearch("")
};

const fetchName = () => {
  axios.get(`http://localhost:5000/faker`).then(({ data }) => {
    setTodo(data);
      });
}

const deleteAllTask = () => {
  axios.delete(`http://localhost:5000/tasks`).then(({ data}) => {
    setTodos(data);
      });
}


useEffect(() => {
  axios.get(`http://localhost:5000/tasks`).then(({ data }) => {
       setTodos(data.reverse())
      });
    }, []);


  return (
    
      <div className="App">
        <span className="heading">Todo List</span>
        <div className="searchForm">
          <button className="buttonFetch" onClick={fetchName}>Fetch random name task</button>
          <button className="deleteAllTask" onClick={deleteAllTask}>Fetch random name task</button>
        <form className="formSearch" onSubmit={handleSearch}>
          <input
            placeholder="Search TodoList"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span onClick={handleSearch}><AiOutlineSearch /></span>
        </form>
    </div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
  );
};

export default App;
