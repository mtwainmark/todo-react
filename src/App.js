import React, {useState, useEffect} from 'react';
import listSVG from './assets/img/list.svg'
import axios from 'axios'
import {Route, useHistory} from 'react-router-dom'

import {AddButtonList, List, Tasks} from './components/index'

function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)

    let history = useHistory()


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

    const onAddTask = (listId, taskObj) =>{
        const newList = lists.map(item => {
            if(item.id === listId){
                item.tasks = [...item.tasks, taskObj]
            }
            return item
        })
        setLists(newList)
    }

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if(list.id === listId){
                list.tasks = list.tasks.map(task => {
                        if (task.id === taskId) {
                            task.completed = completed
                        }
                        return task
                    }
                )
            }
            return list
        })
        setLists(newList)
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {completed})
            .catch(() => {alert('Не удалось обновить задачу')
            })
    }

    const onEditTask = (listId, taskObj) =>{
            const newTaskText = window.prompt('Измените задачу', taskObj.text)

            if(!newTaskText){
                return
            }

            const newList = lists.map(list => {
                if(list.id === listId){
                    list.tasks = list.tasks.map(task => {
                            if (task.id === taskObj.id) {
                                task.text = newTaskText
                            }
                            return task
                        }
                    )
                }
                return list
            })
            setLists(newList)
            axios
                .patch('http://localhost:3001/tasks/' + taskObj.id, {text: newTaskText})
                .catch(() => {alert('Не удалось обновить задачу')
                })

    }

    const onRemoveTask = (listId, taskId) =>{
        if(window.confirm('Вы действительно хотите удалить задачу')){
            const newList = lists.map(item => {
                if(item.id === listId){
                    item.tasks = item.tasks.filter(task => task.id !== taskId)
                }
                return item
            })
            setLists(newList)
            axios
                .delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {alert('Не удалось удалить задачу')
                })

        }
    }

    const onEditListTitle = (id, title) =>{
        const newList = lists.map(item => {
            if(item.id === id){
                item.name = title
            }
            return item
        })
        setLists(newList)
    }

    useEffect(() => {
        const listId = history.location.pathname.split('lists/')[1]
        if(lists){
            const list = lists.find(list => list.id === Number(listId))
            setActiveItem(list)
        }
    }, [lists, history.location.pathname])

  return (
        <div className='todo'>
            <div className='todo__sidebar'>

                <List
                    onClickItem={item => {
                        history.push(`/`)
                        setActiveItem(item)
                    }}
                    items={[
                    {
                        active: history.location.pathname === '/',
                        icon: listSVG,
                        name: 'Все задачи'
                    },
                ]}
            />
                {lists ? (
                <List
                    isRemovable={true}
                    onClickItem={item => {
                        history.push(`/lists/${item.id}`)
                        setActiveItem(item)
                    }}
                    activeItem={activeItem}
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
                <Route exact path={'/'}>
                    {lists && lists.map(list => (
                        <Tasks
                            key={list.id}
                            onAddTask={onAddTask}
                            list={list}
                            onEditTitle={onEditListTitle}
                            withoutEmpty={true}
                            onEditTask={onEditTask}
                            onRemoveTask={onRemoveTask}
                            onCompleteTask={onCompleteTask}
                        />
                    ))}
                </Route>
                <Route path={'/lists/:id'}>
                    {lists && activeItem  && <Tasks onCompleteTask={onCompleteTask} withoutEmpty={false} onEditTask={onEditTask} onRemoveTask={onRemoveTask} onAddTask={onAddTask} list={activeItem} onEditTitle={onEditListTitle} />}
                </Route>
            </div>
        </div>
  );
}

export default App;
