import React from 'react';
// PROVIDER
import AppProvider from './AppContext';
// COMPONENTS
import Form from './containers/Form';
import PanelInfo from './containers/PanelInfo';
// STYLES
import './main-styles/App.scss';


function App() {
  
   return (
      <AppProvider>
         <div className="App">
            <h1 className="App_title">To do application</h1>
            <div className="App_containers">
               <Form />
               <PanelInfo />
            </div>
         </div>
      </AppProvider>
   );
}

export default App;
