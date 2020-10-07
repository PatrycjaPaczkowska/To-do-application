import React, { createContext, useEffect, useReducer } from 'react';

export const AppContext = createContext();

const ADD = 'ADD';
const DELETE = 'DELETE';
const FETCH = 'FETCH';

// The main array
const allTasks = [];

// Function checks whether the given {id} from Form exists.
const checkId = (tasks, action) => {
   const { id, title, description, priority, onCreateDate } = action.task;

   const idx = id;
   const isTheSameId = Boolean(tasks.find(task => task.id === idx));

   if (isTheSameId) {
      // Creating new Id
      const newIdx = Math.floor(Math.random() * 99999999999) + title;

      action.task = {
         id: newIdx,
         title,
         description,
         priority,
         onCreateDate,
      }

      return [...tasks, action.task];
   }

   else {
      return [...tasks, action.task];
   }

}

// Function delete task by id
const handleDelete = (tasks, action) => {
   const newTasksTab = tasks.filter(task => task.id !== action);
   return [...newTasksTab];
}


const AppProvider = ({ children }) => {
   const tasksReducer = (tasks, action) => {

      switch (action.type) {
         case ADD:
            return checkId(tasks, action);
         case DELETE:
            return handleDelete(tasks, action.id);
         case FETCH:
            return action.data;
         default:
            throw new Error("Nie znaleziono akcji w coursesReducer")
      }

   }

   const [tasks, dispatch] = useReducer(tasksReducer, []);

   useEffect(() => {
      dispatch({ type: FETCH, data: allTasks })
   }, [])


   return (
      <AppContext.Provider value={{
         tasks,
         dispatch
      }}>
         {children}
      </AppContext.Provider>
   );
}

export default AppProvider;