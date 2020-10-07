import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
// Components
import ToDo from "./ToDo";
// Styles
import '../main-styles/main.scss';


const PanelInfo = () => {
   const { tasks, dispatch } = useContext(AppContext);
  
   const tasksList = tasks.map(task => <ToDo handlerDelButton={dispatch} task={task} key={task.id} />);
   const panelInfoContainer = <div className="App_panelInfo">{tasksList}</div>;
   
   return (

      <>
      {tasksList.length ? panelInfoContainer : null}
      </>
      
   );
}

export default PanelInfo;