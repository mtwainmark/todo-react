import React from "react";
import axios from 'axios'
import classNames from 'classnames';

import './List.scss'
import Badge from "../Badge/Badge";
import removeSVG from '../../assets/img/remove.svg'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) =>{
        if(window.confirm('Действительно хотите удалить?')){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }

    return(
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li onClick={onClickItem ? () => onClickItem(item) : null} key={index}  className={classNames(item.className, {
                    active: item.active
                        ? item.active
                        : activeItem && activeItem.id === item.id
                    })}
                >
                    <i>
                        {item.icon ? <img src={item.icon} alt={''}/> : <Badge color={item.color.name}/>}
                    </i>
                    <span>{item.name}
                        {item.tasks && ` (${item.tasks.length})`}</span>
                    {isRemovable && <img onClick={() => removeList(item)} className={'list__remove-icon'} src={removeSVG} alt={'remove'}/> }
                </li>
            ))}
        </ul>
    )
}

export default List