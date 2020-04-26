import React from 'react';
import checkSVG from "../../assets/img/check.svg";
import editSVG from "../../assets/img/edit.svg";
import removeSVG from "../../assets/img/remove.svg";

const TaskItem = ({ id, text, completed, list, onRemove, onEdit, onComplete }) => {

    const onChangeCheckBox = e => {
        onComplete(list.id, id, e.target.checked)
    }

    return (
        <div key={id} className="tasks__items-row">
            <div className={"checkbox"}>
                <input onChange={onChangeCheckBox} id={`task-${id}`} type={'checkbox'} checked={completed}/>
                <label htmlFor={`task-${id}`}>
                    <img src={checkSVG} alt={'check'}/>
                </label>
            </div>
            <p>{text}</p>
            <div className="tasks__items-row-actions">
                <div onClick={() => onEdit(list.id, { id, text })}>
                    <img src={editSVG} alt={'edit'}/>
                </div>
                <div onClick={() => onRemove(list.id, id)}>
                    <img src={removeSVG} alt={'remove'}/>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;