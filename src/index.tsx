import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
if(!rootElement) {
    throw new Error('root element not found')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </React.StrictMode>
);