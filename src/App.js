import React, {useState} from 'react';
import List from './components/List/List'

import listSVG from './assets/img/list.svg'
import AddButtonList from "./components/AddList/AddList";
import Tasks from "./components/Tasks/Tasks";

function App() {
    const [lists, setLists] = useState(DB.lists.map(item => {
        item.color = DB.colors.filter(color => color.id === item.colorId)[0].name
        return item
    }))

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

                <List
                    isRemovable={true}
                    items={lists}

                />

                <AddButtonList onAdd={onAddList} colors={DB.colors}/>
            </div>
            <div className={'todo__tasks'}>
             <Tasks/>
            </div>
        </div>
  );
}

export default App;
