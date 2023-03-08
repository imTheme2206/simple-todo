import React from 'react'
import { Form } from 'react-bootstrap';

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id);
    }
  return (
    <Form.Check type="checkbox" 
      checked={todo.complete} 
      onChange={handleTodoClick}
      label={todo.name}
    />
  )
}
