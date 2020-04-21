import React from 'react'

import editSVG from '../../assets/img/edit.svg'
import checkSVG from '../../assets/img/check.svg'

import './Tasks.scss'

const Tasks = () => {
    return(
        <div className={'tasks'}>
            <h2 className={'tasks__title'}>
                Фронтенд
                <img src={editSVG} alt={'edit'}/>
            </h2>

            <div className={"tasks__items"}>
                <div className="tasks__items-row">
                    <div className={"checkbox"}>
                        <input id={'check'} type={'checkbox'}/>
                        <label htmlFor={'check'}>
                            <img src={checkSVG} alt={'check'}/>
                        </label>
                    </div>
                    <input value={'React JS Hooks (useState, useContext, useReducer)'}/>
                </div>
            </div>
        </div>
    )
}

export default Tasks