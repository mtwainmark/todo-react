import React, {useState} from 'react'
import List from "../List/List";
import addSVG from "../../assets/img/add.svg";

import './AddList.scss'
import closeSVG from '../../assets/img/close.svg'
import Badge from "./Badge/Badge";

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setvisiblePopup] = useState(false)
    const [selectColor, setSelectColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState(null)

    const onClose = () => {
        setvisiblePopup(false)
        setInputValue('')
        setSelectColor(colors[0].id)
    }

    const addList = () =>{
        if(!inputValue){
            alert('Введите название списка')
            return
        }

        onAdd({id: Math.random()*100, name: inputValue, color: colors.filter(c => c.id === selectColor)[0].name})

        onClose()
    }

    return(
        <div className={'add-list'}>

            <List
                onClick={() => setvisiblePopup(true)}
                items={[
                    {
                        icon: addSVG,
                        name: 'Добавить список'
                    },
                ]}
            />

            {visiblePopup && <div className={'add-list__popup'}>
                <img onClick={onClose} src={closeSVG} alt={'close'} className="add-list__popup-close-btn"/>
                <input className={'field'} type={'text'} placeholder={'Название списка'} value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <div className="add-list__popup-colors">
                    {colors.map(color => <Badge className={selectColor === color.id && 'active'} onClick={() => setSelectColor(color.id)} key={color.id} color={color.name}/>)}
                </div>
                <button onClick={addList} className={'button'}>Добавить</button>
            </div>}
        </div>
    )
}


export default AddList