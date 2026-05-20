import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  if (todos.length === 0) {
    return <p className="empty-message">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
