import { useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
export default function TodoStats() {
  const { todos } = useTodos();
  const completed = useMemo(() => todos.reduce((total, todo) => total + Number(todo.completed), 0), [todos]);
  const percentage = todos.length ? Math.round(completed / todos.length * 100) : 0;
  return <section className="stats" aria-label="Resumo das tarefas"><div className="stat"><span>Total</span><strong>{todos.length.toString().padStart(2, '0')}</strong></div><div className="stat"><span>Pendentes</span><strong className="amber">{(todos.length - completed).toString().padStart(2, '0')}</strong></div><div className="stat"><span>Concluídas</span><strong className="teal">{completed.toString().padStart(2, '0')}</strong></div><div className="progress"><div><span>Seu progresso</span><strong>{percentage}%</strong></div><progress value={completed} max={todos.length || 1} aria-label="Tarefas concluídas"/><p aria-live="polite">{completed} de {todos.length} tarefas concluídas</p></div></section>;
}
