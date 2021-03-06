import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store/store";
import  createTheme  from '@material-ui/core/styles/createTheme'
import { ThemeProvider } from '@material-ui/styles'


let theme = createTheme({
  palette: {
    primary: {
      main: '#8F1FC3',
      dark: '#5F048A',
    },
    secondary: {
      main: '#FFC700',
      dark: '#D1A402',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById('root')
)
