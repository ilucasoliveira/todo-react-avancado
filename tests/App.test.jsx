import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { TodoProvider, STORAGE_KEY } from '../src/context/TodoContext';
const mount = () => render(<TodoProvider><App /></TodoProvider>);
async function add(user, text) {
  await user.type(screen.getByLabelText('O que você quer fazer?'), text);
  await user.click(screen.getByRole('button', { name: /Adicionar/ }));
}
describe('Todo List', () => {
  it('adiciona, conclui, filtra, reabre e remove tarefas', async () => {
    const user = userEvent.setup(); mount();
    await add(user, 'Estudar React'); await add(user, 'Praticar hooks');
    await user.click(screen.getByRole('checkbox', { name: 'Estudar React' }));
    await user.click(screen.getByRole('button', { name: 'Pendentes' }));
    expect(screen.queryByText('Estudar React')).not.toBeInTheDocument();
    expect(screen.getByText('Praticar hooks')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Concluídas' }));
    expect(screen.getByText('Estudar React')).toBeInTheDocument();
    expect(screen.queryByText('Praticar hooks')).not.toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Estudar React' }));
    expect(screen.getByText('Cada conclusão conta.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Todas' }));
    await user.click(screen.getByRole('button', { name: 'Remover Estudar React' }));
    expect(screen.queryByText('Estudar React')).not.toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
  });
  it('rejeita espaços em branco e mantém foco após adicionar', async () => {
    const user = userEvent.setup(); mount();
    await add(user, '   ');
    expect(screen.getByRole('alert')).toHaveTextContent('Escreva uma tarefa');
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    await add(user, '  Ler documentação  ');
    expect(screen.getByRole('checkbox', { name: 'Ler documentação' })).toBeInTheDocument();
    expect(screen.getByLabelText('O que você quer fazer?')).toHaveFocus();
  });
  it('recupera tarefas depois de remontar a aplicação', async () => {
    const user = userEvent.setup(); const view = mount();
    await add(user, 'Persistir tarefa');
    await user.click(screen.getByRole('checkbox', { name: 'Persistir tarefa' }));
    view.unmount(); mount();
    expect(screen.getByRole('checkbox', { name: 'Persistir tarefa' })).toBeChecked();
  });
  it.each(['{broken', '{}', '[{"id":"1","text":false,"completed":true}]'])('ignora dados inválidos: %s', (data) => {
    localStorage.setItem(STORAGE_KEY, data); mount();
    expect(screen.getByText('Seu próximo passo começa aqui.')).toBeInTheDocument();
  });
  it('continua funcionando se o armazenamento falhar', async () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota'); });
    try {
      const user = userEvent.setup(); mount(); await add(user, 'Tarefa na sessão');
      expect(screen.getByRole('checkbox', { name: 'Tarefa na sessão' })).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível salvar');
    } finally { spy.mockRestore(); }
  });
});
