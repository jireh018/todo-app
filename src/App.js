import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tasks from './pages/Tasks';
import Task from './components/Task'
//`https://my-portfolio-jireh.onrender.com/api/v1/service`


function App() {
  return (
    <Routes>
      <Route index element={<Tasks />} />
      <Route path='/task/:id' element={<Task />} />
    </Routes>
  );
}

export default App;
