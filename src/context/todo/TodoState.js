import React , { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { 
    ADD_TODO,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO, 
    SHOW_LOADER, 
    UPDATE_TODO 
} from '../types'
import {TodoContext} from './todoContext'
import { todoReducer } from './todoReducer'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState )

    const addTodo = async title => {
        const data = await Http.post(
            'https://rn-todo-app-572e0-default-rtdb.europe-west1.firebasedatabase.app/todos.json', 
            {title}
        )
        dispatch({ type: ADD_TODO, title, id: data.name })
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Remove Todo',
            `Are you sure you want to remove "${todo.title}"?`,
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Remove',
                style: 'destructive',
                onPress: async () => {
                    changeScreen(null)
                    await Http.delete(
                        `https://rn-todo-app-572e0-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
                    )
                    dispatch({ type: REMOVE_TODO, id })
                }
              }
            ],
            { cancelable: false }
          )
    }

    const fetchTodos = async () => {
        showLoader()
        const data = await Http.get('https://rn-todo-app-572e0-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
        const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
        dispatch({ type: FETCH_TODOS, todos })
        hideLoader()
    }

    const updateTodo = async (id, title) => {
        await Http.patch(`https://rn-todo-app-572e0-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`)
        dispatch({ type: UPDATE_TODO, id, title })
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    return (
        <TodoContext.Provider 
            value={{
                todos: state.todos,
                loading: state.loading,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}