import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    // { id: '1', title: 'React Native' }
  ])

  const addTodo = (title) => {
    setTodos(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        title
      }
    ])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
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
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }))
  }

  let content = (
    <MainScreen 
      todos={todos} 
      addTodo={addTodo} 
      removeTodo={removeTodo} 
      openTodo={setTodoId} 
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen 
        onRemove={removeTodo} 
        onSave={updateTodo}
        goBack={() => setTodoId(null)} 
        todo={selectedTodo} 
      />
    )
  }

  return (
    <View>
      <Navbar title='Todo App' />
      <View style={styles.container}>{ content }</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
