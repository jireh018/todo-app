import { stat } from 'fs'
import React, { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = `http://localhost:5000/api/v1/task`

const Task = (props) => {
    const { id } = useParams()
    const { state } = useLocation()
    const { task } = state.task
    const [newTask, setNewTask] = useState(task.title)
    const [newChecked, setNewChecked] = useState(task.completed)

    const updateSingleTask = async (id) => {
        console.log(newTask)
        await axios.patch(baseUrl + `/${id}`, { title: newTask, completed: newChecked })
            .then((response) => {
                console.log('updated', newChecked)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className='flex justify-center items-center h-screen '>
            <Link to='/'>
                <button className='border rounded bg-green-500 p-2 text-white hover:bg-green-600'>Go Back to Tasks List</button>
            </Link>

            <div className=' mx-auto border border-yellow-950 p-2 w-[500px] bg-slate-50'>
                <div className='flex justify-between items-center'>
                    <div className=' bg-white mb-2 rounded shadow-lg cursor-pointer hover:bg-slate-100 p-3 w-full'
                    >

                        <div className='flex items-center ml-4'>
                            <input type="checkbox" name="taskChecked" className='cursor-pointer'
                                defaultChecked={task.completed}
                                value={newChecked}
                                onChange={(e) => setNewChecked(!newChecked)}
                            />
                            <input type="text" className={task.completed ? 'text-xl font-semibold ml-2 line-through' : 'text-xl font-semibold ml-2'}
                                defaultValue={task.title}
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>


                    </div>

                    <div className='flex gap-2 mx-2 my-2'>
                        <button className='border rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
                            onClick={() => updateSingleTask(task._id)}
                        >
                            update
                        </button>
                        <button className='border rounded bg-red-500 p-2 text-white hover:bg-red-600'
                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Task
