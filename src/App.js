import React, { useState, useEffect } from 'react'
import Task from './components/Task';

import axios from 'axios'

const baseUrl = `http://localhost:5000/api/v1/task`
//`https://my-portfolio-jireh.onrender.com/api/v1/service`


function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const getAllTasks = async () => {
    await axios.get(baseUrl)
      .then((response) => {
        const data = response.data.tasks
        setTasks(data)
      })
      .catch(error => {
        if (!error.response) {
          // network error
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
  }

  const createTask = async (currentTask: string) => {
    await axios.post(baseUrl, { title: currentTask })
      .then((response) => {
        //const data = response.data.tasks
      })
      .catch(error => {
        if (!error.response) {
          // network error
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
  }

  const deleteTask = async (id: string) => {
    console.log('delete')
    await axios.delete(baseUrl + `/${id}`)
      .then((response) => {
        console.log('deleted')
      })
      .catch(error => {
        if (!error.response) {
          // network error
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
  }

  useEffect(() => {
    getAllTasks()
  }, [createTask, deleteTask])


  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(task)
    setTask('')
  }

  const handleDeleteTask = (id) => {
    deleteTask(id)
  }

  const handleChangeCheckBox = () => [
    console.log('task checkbox ')
  ]

  return (
    <div className="container mx-auto my-40">
      <h1 className='text-center text-2xl font-bold'>Create Task</h1>
      <form action="" className='text-center font-semibold text-xl mb-5' onSubmit={handleSubmit}>
        <label htmlFor="">Title : </label>
        <input type="text" className='border p-2 mx-3' placeholder='Task title...' value={task} onChange={(e) => setTask(e.target.value)} />
        <button className='border rounded bg-cyan-700 p-2 text-white hover:bg-cyan-900'
        >
          create
        </button>
      </form>

      {/**TASK ADDED */}
      <div className=' mx-auto border border-yellow-950 p-2 w-[500px] bg-slate-100'>
        {tasks.map((task) => (
          <div className='flex justify-between items-center bg-white mb-2 rounded shadow-lg cursor-pointer'>
            <div className='flex justify-between items-center ml-4'>
              <input type="checkbox" name="taskChecked" className='cursor-pointer'
                checked={task.completed}
                onChange={handleChangeCheckBox}
              />
              <p className={task.completed ? 'text-xl font-semibold ml-2 line-through' : 'text-xl font-semibold ml-2'}>
                {task.title}
              </p>
            </div>

            <div className='flex gap-2 mr-2 my-2'>
              <button className='border rounded bg-blue-500 p-2 text-white hover:bg-blue-600'>update</button>
              <button className='border rounded bg-red-500 p-2 text-white hover:bg-red-600'
                onClick={() => handleDeleteTask(task._id)}
              >
                delete
              </button>
            </div>
          </div>
        ))
        }
      </div >
    </div >
  );
}

export default App;
