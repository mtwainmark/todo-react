import React from 'react'

import editSVG from '../../assets/img/edit.svg'
import checkSVG from '../../assets/img/check.svg'

import './Tasks.scss'

const Tasks = ({list}) => {
    return(
        <div className={'tasks'}>
            <h2 className={'tasks__title'}>
                {list.name}
                <img src={editSVG} alt={'edit'}/>
            </h2>

            <div className={"tasks__items"}>
                {list.tasks.map((task) => (
                    <div key={task.id} className="tasks__items-row">
                        <div className={"checkbox"}>
                            <input id={`task-${task.id}`} type={'checkbox'}/>
                            <label htmlFor={`task-${task.id}`}>
                                <img src={checkSVG} alt={'check'}/>
                            </label>
                        </div>
                        <input readOnly={true} value={task.text}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tasks