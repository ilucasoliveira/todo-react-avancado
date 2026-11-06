import { useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
export default function TodoList() {
  const { todos, filter, toggleTodo, removeTodo } = useTodos();
  const visibleTodos = useMemo(() => todos.filter((todo) => filter === 'all' || (filter === 'completed' ? todo.completed : !todo.completed)), [todos, filter]);
  if (!visibleTodos.length) return <div className="empty"><span aria-hidden="true">✓</span><h3>{filter === 'completed' ? 'Cada conclusão conta.' : filter === 'pending' ? 'Tudo em dia por aqui.' : 'Seu próximo passo começa aqui.'}</h3><p>{filter === 'completed' ? 'As tarefas que você concluir aparecerão aqui.' : filter === 'pending' ? 'Nenhuma tarefa pendente no momento.' : 'Adicione sua primeira tarefa acima.'}</p></div>;
  return <ul className="todo-list">{visibleTodos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onRemove={removeTodo}/>)}</ul>;
}
