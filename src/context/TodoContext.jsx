import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { readStoredValue, useLocalStorage } from '../hooks/useLocalStorage';

const TodoContext = createContext(null);
export const STORAGE_KEY = 'todo-react-avancado:v1';
const validTodos = (value) => Array.isArray(value) && value.every((todo) =>
  todo && typeof todo.id === 'string' && typeof todo.text === 'string' &&
  todo.text.trim().length > 0 && typeof todo.completed === 'boolean'
) && new Set(value.map((todo) => todo.id)).size === value.length;

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => readStoredValue(STORAGE_KEY, [], validTodos));
  const [filter, setFilter] = useState('all');
  const storageError = useLocalStorage(STORAGE_KEY, todos);

  const addTodo = useCallback((text) => {
    const cleanText = text.trim();
    if (!cleanText || cleanText.length > 200) return false;
    const todo = { id: crypto.randomUUID(), text: cleanText, completed: false };
    setTodos((current) => [...current, todo]);
    return true;
  }, []);
  const toggleTodo = useCallback((id) => {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }, []);
  const removeTodo = useCallback((id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);
  const value = useMemo(() => ({ todos, filter, setFilter, addTodo, toggleTodo, removeTodo, storageError }),
    [todos, filter, addTodo, toggleTodo, removeTodo, storageError]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos deve ser usado dentro de TodoProvider.');
  return context;
}
