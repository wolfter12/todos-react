import React, { useEffect } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
import Loader from './Loader';
import AddTodo from './Todo/AddTodo';

function App() {
  const [TODOS, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000)
      });
  }, []);

  function addTodo(title) {
    setTodos(
      TODOS.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        }
      ])
    );
  }

  const toggleTodo = (id) => {
    setTodos(
      TODOS.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  function removeTodo(id) {
    setTodos(TODOS.filter(todo => todo.id !== id));
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1 className='header'>Example of todos</h1>
        <AddTodo onCreate={addTodo} />

        {loading && <Loader />}
        {
          TODOS.length
            ? <TodoList todos={TODOS} onToggle={toggleTodo} />
            : loading
              ? null
              : <p>No todos</p>
        }

      </div>
    </Context.Provider>
  );
}

export default App;
