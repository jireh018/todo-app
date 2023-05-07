import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = `http://localhost:5000/api/v1/task`

let arrayTest = [
    {
        id: 1,
        name: "b"
    },
    {
        id: 2,
        name: "ba"
    }
]

const Tasks = () => {

    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])

    const getAllTasks = async () => {
        await axios.get(baseUrl)
            .then((response) => {
                const data = response.data.tasks
                setTasks(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const createTask = useCallback(
        async (currentTask: string) => {
            await axios.post(baseUrl, { title: currentTask })
                .then((response) => {
                    //const data = response.data.tasks
                })
                .catch(error => {
                    console.log(error)
                })
        }, []
    )

    const deleteTask = useCallback(async (id: string) => {
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
    }, []
    )


    const handleSubmit = (e) => {
        e.preventDefault()
        createTask(task)
        setTask('')
    }

    const handleDeleteTask = (id) => {
        deleteTask(id)
    }

    useEffect(() => {
        getAllTasks()
    }, [handleSubmit, handleDeleteTask])

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
            <div className=' mx-auto border border-yellow-950 p-2 w-[500px] bg-slate-50'>
                {tasks.map((task) => (

                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between items-center bg-white mb-2 rounded shadow-lg cursor-pointer hover:bg-slate-100 p-3 w-full'
                        >
                            <div className='flex items-center ml-4'>
                                <input type="checkbox" name="taskChecked" className='cursor-pointer'
                                    checked={task.completed}
                                    disabled
                                />
                                <p className={task.completed ? 'text-xl font-semibold ml-2 line-through' : 'text-xl font-semibold ml-2'}>
                                    {task.title}
                                </p>
                            </div>

                            <div className='flex gap-2 mx-2 my-2'>
                                <Link
                                    to={{ pathname: `/task/${task._id}` }}
                                    state={{ task: { task } }}
                                >
                                    <button className='border rounded bg-blue-500 p-2 text-white hover:bg-blue-600'>update</button>
                                </Link>

                                <button className='border rounded bg-red-500 p-2 text-white hover:bg-red-600'
                                    onClick={() => handleDeleteTask(task._id)}
                                >
                                    delete
                                </button>
                            </div>

                        </div>


                    </div>


                ))
                }
            </div >
        </div >
    )
}

export default Tasks
