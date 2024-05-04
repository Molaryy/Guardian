// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Homepage';
import Login from './pages/Logins';
import Generate from './pages/Generate';
import Certificate from './pages/Certificate';
import Library from './pages/Library';
import Register from './pages/Register';


const App: React.FC = () => {
  return (
    <html>
      <Home />
    </html>
  );
}

export default App;