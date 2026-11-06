import { useTodos } from '../context/TodoContext';
const filters = [['all', 'Todas'], ['pending', 'Pendentes'], ['completed', 'Concluídas']];
export default function TodoFilters() {
  const { filter, setFilter } = useTodos();
  return <div className="filters" role="group" aria-label="Filtrar tarefas">{filters.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>;
}
