import { useEffect, useState } from 'react';

// The caller owns the state. This hook only reads and persists its value.
export function useLocalStorage(key, value) {
  const [storageError, setStorageError] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStorageError('');
    } catch {
      setStorageError('Não foi possível salvar neste navegador. Suas tarefas continuam disponíveis nesta sessão.');
    }
  }, [key, value]);
  return storageError;
}

export function readStoredValue(key, fallback, validate = () => true) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
