import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider as ReduxProvider } from 'react-redux';
// import './index.css';
// import App from './App';
// import configureStore from './store';
// import { Modal, ModalProvider } from './context/Modal';
// import { BrowserRouter } from 'react-router-dom';

// const store = configureStore();

// function Root() {
//   return (
//     <ModalProvider>
//       <ReduxProvider store={store}>
//         <BrowserRouter>
//           <App />
//           <Modal />
//         </BrowserRouter>
//       </ReduxProvider>
//     </ModalProvider>
//   );
// }


// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );