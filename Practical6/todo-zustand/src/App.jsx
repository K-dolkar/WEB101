import { useTodoStore } from './store/todoStore';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;
  const hasCompleted = completedCount > 0;

  return (
    <div className="app">
      <header>
        <h1>Todo List</h1>
        <p className="subtitle">React + Zustand with localStorage persistence</p>
      </header>

      <main className="todo-app">
        <TodoInput />
        <TodoList />

        {todos.length > 0 && (
          <footer className="todo-footer">
            <span>
              {activeCount} item{activeCount !== 1 ? 's' : ''} left
            </span>
            {hasCompleted && (
              <button type="button" onClick={clearCompleted}>
                Clear completed ({completedCount})
              </button>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}

export default App;
