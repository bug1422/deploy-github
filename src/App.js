import './App.css';
import {appRouter} from './routes/index'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
