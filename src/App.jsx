import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList/TodoList';
import {v4} from 'uuid';
import { Button, Card, InputGroup, ListGroup, Form , Anchor} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() =>{
    const storedTodo = localStorage.getItem(LOCAL_STORAGE_KEY);

    if(storedTodo !== "[]") 
    {
      
      setTodos(JSON.parse(storedTodo))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name == '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id:v4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos];

    const todo = newTodos.find(todo => todo.id == id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className='d-flex justify-content-center mt-5'>
      <Card border='dark' style={{width: "30em", display:"flex"}}>

        <Card.Header as="h3" className='p-3'>
          To Do List
        </Card.Header>


        <ListGroup className="list-group-flush">
          <TodoList todoLists={todos} toggleTodo={toggleTodo}/>
        </ListGroup>


        <Card.Body>
            <InputGroup className='mb-2'>
              <Form.Control
                  ref={todoNameRef}
                  aria-describedby="add-btn"
                />
                <Button variant="outline-primary" className='px-4' onClick={handleAddTodo} id="add-btn">
                  Add
                </Button>
            </InputGroup>

              <Anchor variant='danger' className='' onClick={handleClearTodo}>Clear Completed</Anchor>

        </Card.Body>

        <Card.Footer as="h6" className='text-muted text-end'>
            <span>{todos.filter(todo => !todo.complete).length} left to do</span>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default App
