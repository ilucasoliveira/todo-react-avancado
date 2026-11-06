import { useRef, useState } from 'react';
import { useTodos } from '../context/TodoContext';
export default function TodoForm() {
  const { addTodo, setFilter } = useTodos();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    if (!addTodo(text)) { setError('Escreva uma tarefa de 1 a 200 caracteres.'); return; }
    setText(''); setError(''); setFilter('all'); inputRef.current.focus();
  }
  return <form onSubmit={handleSubmit} className="todo-form">
    <label htmlFor="task">O que você quer fazer?</label>
    <div className="input-row"><input ref={inputRef} id="task" value={text} maxLength={200} placeholder="Ex.: praticar Context API" onChange={(event) => { setText(event.target.value); setError(''); }} aria-invalid={!!error} aria-describedby={error ? 'form-error' : 'input-hint'} autoComplete="off"/><button className="primary" type="submit"><span aria-hidden="true">＋</span> Adicionar</button></div>
    <p className="hint" id="input-hint">Um pequeno passo já faz diferença. Até 200 caracteres.</p>
    {error && <p id="form-error" role="alert" className="error">{error}</p>}
  </form>;
}
