import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
// Styles
import '../main-styles/main.scss';
// Components
import ToDo from "./ToDo";


const PanelInfo = () => {
   const { tasks, dispatch } = useContext(AppContext);

   const tasksList = tasks.map(task => <ToDo handlerDelButton={dispatch} task={task} key={task.id} />);

   const panelInfoContainer = <div className="App_panelInfo"><p className="App_panelInfo--info">Click on the title to strike out the task</p>{tasksList}</div>;

   // const showInfo = tasksList.length ? <p className="App_panelInfo--info">Click on the title to strike out the task</p> : null;

   return (

      <>
         {/* {showInfo} */}
         {tasksList.length ? panelInfoContainer : null}
      </>

   );
}

export default PanelInfo;