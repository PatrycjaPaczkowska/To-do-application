//ANIMACJE I STYLE
import { motion } from "framer-motion";
import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import '../main-styles/Form.scss';


const Form = () => {
   const { tasks, dispatch } = useContext(AppContext);

   const [textTask, setTextTask] = useState("");
   const [textareaTask, setTextareaTask] = useState("");
   const [isPriority, setIsPriority] = useState(false);

   const [notEnoughLetters, setNotEnoughLetter] = useState(false);

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

   const handleAllForm = (e) => {
      e.preventDefault();

      const newId = Math.floor(Math.random() * 999999999999999999) + textTask;
      const onCreateDate = new Date().toLocaleString();

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

      setTextTask("");
      setTextareaTask("");
      setIsPriority(isPriority => isPriority = false);
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

   const notEnoughLettersWarning = notEnoughLetters && <motion.span initial="hidden" animate="visible" variants={variants} style={styleOfWarning}>Minimalna długość tekstu to 5 znaków</motion.span>;

   return (
      <div className="App_creatorTask">
         <h2 className="App_creatorTask--title">Create new task</h2>

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
   );
}

export default Form;