import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Invoices from './components/Invoices';
import './App.css';
import UserHeader from "./components/UserHeader";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Invoice App</h1>
                    <UserHeader/>
                </header>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/invoices" element={<Invoices/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
