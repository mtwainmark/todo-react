import React, {useEffect, useState} from 'react'
import List from "../List/List";
import addSVG from "../../assets/img/add.svg";
import axios from 'axios'
import './AddList.scss'
import closeSVG from '../../assets/img/close.svg'
import Badge from "../Badge/Badge";

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setvisiblePopup] = useState(false)
    const [selectColor, setSelectColor] = useState(3)
    const [inputValue, setInputValue] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if(Array.isArray(colors)){
            setSelectColor(colors[0].id)
        }
    },[colors])

    const onClose = () => {
        setvisiblePopup(false)
        setInputValue('')
        setSelectColor(colors[0].id);
    }

    const addList = () =>{
        if(!inputValue){
            alert('Введите название списка')
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists',{
            name: inputValue, colorId: selectColor
        }).then(({data}) => {
            const color = colors.filter(c => c.id === selectColor)[0].name
            const listObj = {...data, color: { name: color }}
            onAdd(listObj)
            onClose()
        })
            .finally(() => {
            setIsLoading(false);
        })

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
                <button onClick={addList} className={'button'}> {isLoading ? 'Добавление...' : 'Добавить'}</button>
            </div>}
        </div>
    )
}


export default AddList