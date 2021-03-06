import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
// Animation and stylea
import '../main-styles/main.scss';

const Form = () => {
   // eslint-disable-next-line
   const { tasks, dispatch } = useContext(AppContext);

   // Value from Formnpm
   const [textTask, setTextTask] = useState("");
   const [textareaTask, setTextareaTask] = useState("");
   const [isPriority, setIsPriority] = useState(false);

   // Value for warning
   const [notEnoughLetters, setNotEnoughLetter] = useState(false);
   const [clickedPlus, setClickedPlus] = useState(false);
   const sizeOfWindow = window.matchMedia('(max-width: 400px)');

   // Handling the form 
   const handleAllValue = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      const checked = e.target.checked;

      if (name === 'textTask') {
         setTextTask(value);
      } else if (name === 'textareaTask') {
         setTextareaTask(value)
      } else if (name === 'isPriority') {
         setIsPriority(checked);
      } else {
         throw Error("Error in handleAllValue, in Form.js")
      }

   }

   // Handling creating a new task - transmission to the context
   const handleAllForm = (e) => {
      e.preventDefault();

      // ID drawing
      const newId = Math.floor(Math.random() * 999999999999999999) + textTask;

      // Get a creating date
      const onCreateDate = new Date().toLocaleString();

      // Test length of title/textTask
      if (textTask.length < 5) {
         setNotEnoughLetter(true);
         return;
      } else {
         setNotEnoughLetter(false)
      }

      let task = {
         id: newId,
         title: textTask,
         description: textareaTask,
         priority: isPriority,
         onCreateDate,
      }

      dispatch({
         task,
         type: 'ADD'
      });

      // Reset Value on Form
      setTextTask("");
      setTextareaTask("");
      setIsPriority(isPriority => isPriority = false);
      if(sizeOfWindow.matches) setClickedPlus(false);
      console.log(sizeOfWindow.matches);
   }

   const styleOfWarning = {
      opacity: notEnoughLetters ? '1' : '0',
      fontSize: '0.65rem',
      color: '#ff3636',
      transition: 'opacity 1s easy-out'
   }

   const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
   }

   const notEnoughLettersWarning = notEnoughLetters && <motion.p initial="hidden" animate="visible" variants={variants} style={styleOfWarning}>The minimum text length is 5 characters</motion.p>;

   const plusStyle = {
      display: clickedPlus ? 'none' : 'block',
   }

   const containerFormStyle = {
      display: clickedPlus ? 'block' : 'none'
   }

   const handleContainerToggle = () => {
      setClickedPlus(true);
   }

 

   useEffect(() => {
      if (sizeOfWindow.matches) {
         setClickedPlus(false)
      } else {
         setClickedPlus(true)
      }
      console.log(sizeOfWindow.matches);

   }, []);


   return (
      <div className="App_creatorTask">
         <h2 className="App_creatorTask--title">Create new task</h2>

         <p className="App_creatorTask--plus" onClick={handleContainerToggle} style={plusStyle}>+</p>

         <div className="App_creatorTask--containerForm" style={containerFormStyle}>
            <input
               className="App_creatorTask--input"
               type="text"
               placeholder="What do you want to do?"
               name="textTask"
               value={textTask}
               onChange={handleAllValue}
            />

            {notEnoughLettersWarning}

            <input
               className="App_creatorTask--input"
               type="textarea"
               placeholder="Describe (optional)"
               name="textareaTask"
               value={textareaTask}
               onChange={handleAllValue}
            />

            <p className="App_creatorTask--paragraph">Priority?
         <input
                  className="App_creatorTask--paragraph--input"
                  type="checkbox"
                  name="isPriority"
                  checked={isPriority}
                  onClick={handleAllValue}

               />
            </p>

            <button
               className="App_creatorTask--button"
               onClick={handleAllForm}
            >
               Create
         </button>
         </div>
      </div>
   );
}

export default Form;