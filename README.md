# Todo React Avançado

Lista de tarefas responsiva em React: organize tarefas, acompanhe seu progresso e mantenha seus dados no navegador. Projeto desenvolvido para praticar Context API, hooks customizados e memoization.

## Tecnologias

- React 19, JavaScript e JSX
- Vite 7
- CSS com abordagem Mobile First
- Context API, useState, useEffect, useContext, useCallback, useMemo e React.memo
- Vitest, Testing Library e jsdom
- localStorage (sem backend ou autenticação)

## Como executar

Instale Node.js 22.12 ou superior e npm. Extraia o projeto ou clone seu repositório e, dentro da pasta `todo-react-avancado`, execute:

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente http://localhost:5173).

```bash
npm test          # testes automatizados
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build localmente
```

## Funcionalidades

- Adicionar tarefas de até 200 caracteres, com validação de espaços em branco.
- Concluir, reabrir e remover tarefas.
- Filtrar por todas, pendentes e concluídas.
- Contadores e barra de progresso.
- Persistir tarefas após recarregar a página.
- Recuperar-se de dados inválidos e informar falhas de armazenamento.
- Navegar por teclado, com foco visível, labels e botões acessíveis.
- Interface responsiva, com bordas retas e tema escuro.

Ao adicionar uma tarefa, o filtro retorna para “Todas” para que a nova tarefa fique visível. Remover uma tarefa é definitivo. O armazenamento pertence ao navegador e à origem do site: não há sincronização entre dispositivos. Não há sincronização em tempo real entre abas.

## Organização e planejamento dos componentes

```text
src/
  components/
    TodoForm.jsx       # input e validação local
    TodoFilters.jsx    # escolha do filtro global
    TodoItem.jsx       # tarefa individual memoizada
    TodoList.jsx       # lista filtrada com useMemo
    TodoStats.jsx      # indicadores e progresso
  context/
    TodoContext.jsx    # Context, Provider e hook consumidor useTodos
  hooks/
    useLocalStorage.js # leitura validada e persistência com useEffect
  App.jsx              # composição da página
  main.jsx             # ponto de entrada e Provider
  styles.css           # estilos Mobile First
tests/
  App.test.jsx         # testes de comportamento
  setup.js             # ambiente de teste
```

O `TodoProvider` mantém `todos` e `filter` com `useState`. Os componentes acessam esse estado via `useTodos`, que encapsula `useContext`. O formulário mantém seu texto e mensagem de erro em estado local: digitar não atualiza o Context.

O hook `useLocalStorage` recebe uma chave e um valor e usa `useEffect` para persistir as mudanças. A função auxiliar `readStoredValue` permite inicializar o estado de forma preguiçosa, com validação de formato. A lista fica explicitamente no Provider, conforme o requisito do exercício.

## Memoization: o que foi otimizado

- `TodoList` usa `useMemo` para recalcular a filtragem apenas quando tarefas ou filtro mudam.
- `TodoStats` usa `useMemo` para contar tarefas concluídas.
- `TodoItem` usa `React.memo` e recebe callbacks estáveis graças a `useCallback`.
- Ao concluir uma tarefa, apenas seu objeto é substituído. Os objetos das outras tarefas mantêm suas referências, permitindo que seus componentes pulem a renderização.
- O valor do Provider usa `useMemo`. Isso não impede a atualização dos consumidores quando o estado global realmente muda.

### Como conferir as renderizações

1. Rode `npm run dev` e adicione duas tarefas.
2. Em `TodoItem.jsx`, descomente o `console.count` indicado dentro do componente.
3. Limpe o console e conclua a primeira tarefa com o filtro “Todas” ativo.
4. O contador da tarefa alterada deve aumentar; o da outra tarefa deve permanecer igual.
5. Digitar no formulário não deve renderizar os itens, pois o input usa estado local.
6. Para comparar, remova temporariamente o wrapper `memo` e repita a ação; depois restaure-o e remova o log.

Também é possível gravar a interação na aba Profiler do React Developer Tools. O `StrictMode` pode executar renderizações adicionais em desenvolvimento; compare quais itens renderizam, em vez de presumir uma quantidade absoluta. Em listas pequenas, o ganho de tempo pode ser mínimo: o objetivo é demonstrar corretamente o controle de renderizações. Não foram medidos ganhos de tempo com o Profiler.

## Validação realizada

- Build de produção concluído com sucesso.
- Sete testes funcionais aprovados.
- Com instrumentação temporária de `console.count`, foi verificado em teste que concluir uma tarefa renderiza somente o item alterado e digitar no formulário não renderiza os itens. A instrumentação foi removida da entrega.
- A inspeção visual em navegador não foi realizada neste ambiente.

## Testes

Os testes cobrem adição, conclusão, reabertura, exclusão, os três filtros, rejeição de texto vazio, foco do formulário, persistência após remontagem, dados inválidos e indisponibilidade do localStorage.

## Publicar no GitHub

Crie um repositório **público**, com o nome exato **todo-react-avancado**, sem inicializar README ou .gitignore no GitHub. Na pasta do projeto:

```bash
git init
git add .
git commit -m "Cria Todo List com Context, hooks e memoization"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/todo-react-avancado.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu usuário no GitHub. O `.gitignore` exclui `node_modules`, `dist` e arquivos de ambiente. Entregue o link do repositório público, conforme solicitado no exercício.
