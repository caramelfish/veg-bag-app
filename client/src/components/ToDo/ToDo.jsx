import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ToDoList from './ToDoList';
import List from './List';

const ToDo = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/todolists/`);
      setLists(response.data);
    };

    fetchLists();
  }, [setLists]);

  return (
    <div className="Main">
      <div className="ToDoList">
        <h1>Material To Do List</h1>
        <ToDoList lists={lists} />
      </div>
      <div className="ToDoTable">
        <h1>Custom To Do List</h1>
        <List lists={lists} />
      </div>
    </div>
  );
};

export default ToDo;
