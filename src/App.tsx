/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

const USER_ID = 11999;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoNameInput, setTodoNameInput] = useState('');
  // const [todoCompleted, setTodoCompleted] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setTodos([...todos, {
      id: +new Date(), // change later, find the bigger id from array, than give it +1.................................
      userId: USER_ID,
      title: todoNameInput,
      completed: false,
    }]);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={event => addTodo(event)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              value={todoNameInput}
              onChange={event => setTodoNameInput(event.target.value)}
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && (
          <section className="todoapp__main" data-cy="TodoList">
            {todos.map(todo => (
              <div data-cy="Todo" className="todo">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed} // при смене чекбокса нужно искать элемент в массиве по айди, map'им в элементе меняем комплитед
                    // onChange={() => setTodoCompleted(!todo.completed)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos.length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

// {/* <section className="todoapp__main" data-cy="TodoList">
//           {/* This is a completed todo */}
//           <div data-cy="Todo" className="todo completed">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//                 checked
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Completed Todo
//             </span>

//             {/* Remove button appears only on hover */}
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* overlay will cover the todo while it is being updated */}
//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is not completed */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Not Completed Todo
//             </span>
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is being edited */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             {/* This form is shown instead of the title and remove button */}
//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 value="Todo is being edited now"
//               />
//             </form>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is in loadind state */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Todo is being saved now
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* 'is-active' class puts this modal on top of the todo */}
//             <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>
//        </section> */}

{ /* Hide the footer if there are no todos */ }
//    <footer className="todoapp__footer" data-cy="Footer">
//    <span className="todo-count" data-cy="TodosCounter">
//      3 items left
//    </span>

//    {/* Active filter should have a 'selected' class */}
//    <nav className="filter" data-cy="Filter">
//      <a
//        href="#/"
//        className="filter__link selected"
//        data-cy="FilterLinkAll"
//      >
//        All
//      </a>

//      <a
//        href="#/active"
//        className="filter__link"
//        data-cy="FilterLinkActive"
//      >
//        Active
//      </a>

//      <a
//        href="#/completed"
//        className="filter__link"
//        data-cy="FilterLinkCompleted"
//      >
//        Completed
//      </a>
//    </nav>

//    {/* don't show this button if there are no completed todos */}
//    <button
//      type="button"
//      className="todoapp__clear-completed"
//      data-cy="ClearCompletedButton"
//    >
//      Clear completed
//    </button>
//  </footer>

{ /* Notification is shown in case of any error */ }
// eslint-disable-next-line no-lone-blocks, padding-line-between-statements
{ /* Add the 'hidden' class to hide the message smoothly */ }

// <div
//   data-cy="ErrorNotification"
//   className="notification is-danger is-light has-text-weight-normal"
// >
//   <button data-cy="HideErrorButton" type="button" className="delete" />
//   {/* show only one message at a time */}
//   Unable to load todos
//   <br />
//   Title should not be empty
//   <br />
//   Unable to add a todo
//   <br />
//   Unable to delete a todo
//   <br />
//   Unable to update a todo
// </div>
