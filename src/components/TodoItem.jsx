import { memo } from 'react';
const TodoItem = memo(function TodoItem({ todo, onToggle, onRemove }) {
  // Enable temporarily to compare renders: console.count(`TodoItem: ${todo.id}`);
  return <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
    <label className="task-label"><input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)}/><span>{todo.text}</span></label>
    <button className="delete" type="button" onClick={() => onRemove(todo.id)} aria-label={`Remover ${todo.text}`} title="Remover tarefa"><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/></svg></button>
  </li>;
});
export default TodoItem;
