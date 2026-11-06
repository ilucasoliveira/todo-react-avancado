import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { useTodos } from './context/TodoContext';
export default function App() {
  const { storageError } = useTodos();
  return <main className="app"><header><div className="brand"><span aria-hidden="true">✓</span> TODO<span className="brand-sub">/ REACT</span></div><p className="eyebrow">MENOS RUÍDO. MAIS FOCO.</p><h1>Uma tarefa<br/><em>de cada vez.</em></h1><p className="intro">Organize suas ideias. Dê o próximo passo.</p></header><TodoStats/><section className="workspace" aria-labelledby="tasks-title"><TodoForm/><div className="list-heading"><h2 id="tasks-title">Minhas tarefas</h2><TodoFilters/></div><TodoList/></section>{storageError && <p className="error" role="alert">{storageError}</p>}<footer><span>TODO REACT AVANÇADO</span><span>{storageError ? 'Armazenamento indisponível' : 'Tarefas salvas neste navegador'}</span></footer></main>;
}
