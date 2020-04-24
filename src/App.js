import React, {useState, useEffect} from 'react';
import listSVG from './assets/img/list.svg'
import axios from 'axios'

import {AddButtonList, List, Tasks} from './components/index'

function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({ data }) => {
                setLists(data)
            });
        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setColors(data)
        });
    }, [])

    const onAddList = (obj) =>{
        const newList = [ ...lists, obj]
        setLists(newList)
    }
  return (
        <div className='todo'>
            <div className='todo__sidebar'>

                <List
                    items={[
                    {
                        icon: listSVG,
                        name: 'Все задачи'
                    },
                ]}
            />
                {lists ? (
                <List
                    isRemovable={true}
                    onRemove={id => {
                        const newLists = lists.filter(item => item.id !== id);
                        setLists(newLists);
                    }}
                    items={lists}

                />
                    ) : (
                        'Загрузка...'
                    )}

                <AddButtonList onAdd={onAddList} colors={colors}/>
            </div>
            <div className={'todo__tasks'}>
                {lists && <Tasks list={lists[0]} />}
            </div>
        </div>
  );
}

export default App;
