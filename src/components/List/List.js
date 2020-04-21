import React from "react";


import './List.scss'
import Badge from "../AddList/Badge/Badge";
import removeSVG from '../../assets/img/remove.svg'

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) =>{
        if(window.confirm('Действительно хотите удалить?')){
            onRemove(item)
        }
    }

    return(
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li key={index} className={item.active ? 'active' : ''}>
                    <i>
                        {item.icon ? <img src={item.icon}/> : <Badge color={item.color}/>}
                    </i>
                    <span>{item.name}</span>
                    {isRemovable && <img onClick={() => removeList(item)} className={'list__remove-icon'} src={removeSVG} alt={'remove'}/> }
                </li>
            ))}
        </ul>
    )
}

export default List