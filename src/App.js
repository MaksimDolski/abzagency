import React, { useState } from 'react';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

const App = () => {

  const [userUpdated, setUserUpdated] = useState(false);

  const getUpdatedData = () => {
    setUserUpdated(true);
  }

  return (
    <>
    <div className="app">
      <Header />
      <IntroSection />
    </div>
    
    <div className='container'>
      <Card userUpdated={userUpdated} />
      <Form getUpdatedData={getUpdatedData}/>
    </div>
    </>
    );
    }
  
  export default App;
