// App.js
import React, { useState } from 'react';
import RecipeMe from './RecipeMe';
import ErrorPage from './ErrorPage';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<RecipeMe />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
