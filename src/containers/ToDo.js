import React, { useState } from 'react';

const Todo = ({ task, handlerDelButton }) => {
   const [onClickDate, setOnClickDate] = useState();

   if (!task) return;


   const { id, title, description, priority, onCreateDate } = task;

   const handleDeleteTask = () => handlerDelButton({
      id,
      type: 'DELETE'
   });

   const styleTitle = {
      textAlign: 'left',
      color: priority ? 'red' : 'white',
      textDecoration: onClickDate ? 'line-through' : null,
   }

   const important = priority ? '!!! ' : null;

   const handleTaskDone = () => {
      const onTaskClickDate = new Date().toLocaleString();

      if (onClickDate) {
         setOnClickDate("");
      } else {
         setOnClickDate(onTaskClickDate);
      }
   }

   const isTaskDone = onClickDate ? <p className="App_panelInfo--task--date" className="App_panelInfo--task--date">Ukończono: {onClickDate}</p> : null;

   return (
      <>
         <div className="App_panelInfo--task">
            <div className="App_panelInfo--task--container">
               <p
                  className="App_panelInfo--task--text"
                  style={styleTitle}
                  onClick={handleTaskDone}
               >
                  {important}{title} - <span className="App_panelInfo--task--date">{onCreateDate} </span>

               </p>
               <button className="App_panelInfo--task--button" onClick={handleDeleteTask}>x</button>
            </div>
            <p className="App_panelInfo--task--description">{description}</p>
            {isTaskDone}
         </div>
      </>
   )
}

export default Todo;