import React, { useState } from 'react';

const Todo = ({ task, handlerDelButton }) => {
   const [onClickDate, setOnClickDate] = useState();

   // Checking whether the task exist
   if (!task) return;

   const { id, title, description, priority, onCreateDate } = task;

   const handleDeleteTask = () => handlerDelButton({
      id,
      type: 'DELETE'
   });

   const styleTitle = {
      textAlign: 'left',
      color: priority ? 'rgb(255, 54, 54)' : 'white',
      textDecoration: onClickDate ? 'line-through' : null,
   }

   const important = priority ? '!!! ' : null;

   // Creating finish date and handle toggle
   const handleTaskDone = () => {
      const onTaskClickDate = new Date().toLocaleString();
      onClickDate ? setOnClickDate("") : setOnClickDate(onTaskClickDate);
   }

   const isTaskDone = onClickDate ? <p className="App_panelInfo--task--date--finish">Ukończono: {onClickDate}</p> : null;

   const onCreateDateInfo = <p className="App_panelInfo--task--createDate">{onCreateDate}</p>

   const descriptionInfo = <p className="App_panelInfo--task--description">{description}</p>

   return (
      <>
         <div className="App_panelInfo--task">
            {onCreateDateInfo}
            <div className="App_panelInfo--task--maincontainer">
               <div className="App_panelInfo--task--container">

                  <p
                     className="App_panelInfo--task--text"
                     style={styleTitle}
                     onClick={handleTaskDone}
                  >
                     {important}{title}
                  </p>
                  {descriptionInfo}
                  {isTaskDone}
               </div>

               <button
                  className="App_panelInfo--task--button"
                  onClick={handleDeleteTask}>
                  x
               </button>
            </div>
         </div>
      </>
   )
}

export default Todo;