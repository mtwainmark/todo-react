import React from 'react'
import axios from 'axios'

import editSVG from '../../assets/img/edit.svg'


import './Tasks.scss'
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onEditTask, onRemoveTask, onCompleteTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if(newTitle){
            onEditTitle(list.id, newTitle)
            axios
                .patch('http://localhost:3001/lists/' + list.id, {name: newTitle})
                .catch(() => {alert('Не удалось обновить название списка')
            })
        }
    }


    return(
        <div className={'tasks'}>
            <h2 style={{color: list.color.hex}} className={'tasks__title'}>
                {list.name}
                <img onClick={editTitle} src={editSVG} alt={'edit'}/>
            </h2>

            <div className={"tasks__items"}>
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map((task) => (
                 <TaskItem onComplete={onCompleteTask} key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} {...task}/>
                ))}
                <AddTaskForm key={list.id} onAddTask={onAddTask} list={list}/>
            </div>
        </div>
    )
}

export default Tasks