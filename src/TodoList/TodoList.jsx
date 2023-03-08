import React from 'react'
import Todo from '../Todo/Todo'
import { ListGroup } from 'react-bootstrap'

export default function TodoList({todoLists, toggleTodo}) {
  return (
    todoLists.map(todo => {
        return (
          <ListGroup.Item>
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
          </ListGroup.Item>
        ) 
        
    })
  )
}
