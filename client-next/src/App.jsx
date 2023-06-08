import React, {Suspense, useState} from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";


// import HomePage from './HomePage';
// import AboutPage from './AboutPage';
import ThemeContext from '../../ThemeContext.jsx';
import HomePage from "./HomePage.jsx";
import AboutPage from "./AboutPage.jsx";


export default function App() {
  const [theme, setTheme] = useState('slategrey');

  function handleToggleClick() {
    if (theme === 'slategrey') {
      setTheme('hotpink');
    } else {
      setTheme('slategrey');
    }
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div style={{fontFamily: 'sans-serif'}}>
          <div
            style={{
              margin: 20,
              padding: 20,
              border: '1px solid black',
              minHeight: 300,
            }}>
            <button onClick={handleToggleClick}>Toggle Theme Context</button>
            <br/>
            <Suspense fallback={<Spinner/>}>

              <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route exact path='/about' element={<AboutPage/>}/>
              </Routes>

            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

function Spinner() {
  return null;
}
