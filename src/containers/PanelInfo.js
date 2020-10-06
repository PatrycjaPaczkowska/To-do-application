import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import '../main-styles/PanelInfo.scss';
import ToDo from "./ToDo";


const PanelInfo = () => {
   const { tasks, dispatch } = useContext(AppContext);
  

   const tasksList = tasks.map(task => <ToDo handlerDelButton={dispatch} task={task} key={task.id} />);

   return (
      <div className="App_panelInfo">
         {tasksList}
      </div>
   );
}

export default PanelInfo;