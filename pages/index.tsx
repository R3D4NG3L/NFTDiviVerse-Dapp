import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import MyApp from './_app';
import reportWebVitals from './reportWebVitals';

const Home = () => {
  return (
    <React.StrictMode>
      <MyApp />
    </React.StrictMode>
  )
}

export default Home

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
