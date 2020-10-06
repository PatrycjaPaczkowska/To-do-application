import React, { createContext, useEffect, useReducer } from 'react';

export const AppContext = createContext();

const allTasks = [];

const checkId = (tasks, action) => {

   const idx = action.task.id;
   const isTheSameId = Boolean(tasks.find(task => task.id === idx));

   if (isTheSameId) {
      const newIdx = Math.floor(Math.random() * 99999999999) + action.task.title;

      action.task = {
         id: newIdx,
         title: action.task.title,
         description: action.task.description,
         priority: action.task.priority,
         onCreateDate: action.task.onCreateDate,

      }
      return [...tasks, action.task];
   }
   else {
      return [...tasks, action.task];
   }

}

const handleDelete = (tasks, action) => {
   const newTasksTab = tasks.filter(task => task.id !== action);
   return [...newTasksTab];
}

const AppProvider = ({ children }) => {
   const tasksReducer = (tasks, action) => {

      switch (action.type) {
         case 'ADD':
            return checkId(tasks, action);
         case 'DELETE':
            return handleDelete(tasks, action.id);
         case 'FETCH':
            return action.data;
         default:
            throw new Error("Nie znaleziono akcji w coursesReducer")
      }

   }

   const [tasks, dispatch] = useReducer(tasksReducer, []);

   useEffect(() => {
      dispatch({ type: 'FETCH', data: allTasks })
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