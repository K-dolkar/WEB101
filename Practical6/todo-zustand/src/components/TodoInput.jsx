import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

export default function TodoInput() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
