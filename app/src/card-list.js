import React from 'react';
import Card from './card'

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          task: 'Todo-1'
        }
      ],
      ongoing: [
        {
          id: 2,
          task: 'Todo-2'
        }
      ],
      completed: [
        {
          id: 3,
          task: 'Todo-3'
        }
      ],
      draggedTodoKey: '',
      draggedTodo: {}
    }
  }

  onDrag = (event, todo, key) => {
    event.preventDefault();
    this.setState({
      draggedTodoKey: key,
      draggedTodo: todo
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }


  onDrop = (key) => {
    const { ongoing, completed, todos, draggedTodo, draggedTodoKey } = this.state;
    let _ongoing = [...ongoing]
    let _completed = [...completed]
    let _todos = [...todos]

    switch (key) {
      case 'todos':
        _todos = [...todos, draggedTodo]
        break;
      case 'ongoing':
        _ongoing = [...ongoing, draggedTodo]
        break;
      case 'completed':
        _completed = [...completed, draggedTodo]
        break;

      default:
        break;
    }

    switch (draggedTodoKey) {
      case 'todos':
        _todos = todos.filter(t => t.id !== draggedTodo.id)
        break;
      case 'ongoing':
        _ongoing = ongoing.filter(t => t.id !== draggedTodo.id)
        break;
      case 'completed':
        _completed = completed.filter(t => t.id !== draggedTodo.id)
        break;

      default:
        break;
    }

    this.setState({
      completed: _completed,
      todos: _todos,
      ongoing: _ongoing,
      draggedTodoKey: '',
      draggedTodo: {},
    })
  }

  render() {
    const { todos, completed, ongoing } = this.state;
    return (
      <div class="flex px-4 pb-8 items-start overflow-x-scroll">
        <div
          onDrop={event => this.onDrop('todos')}
          onDragOver={(event => this.onDragOver(event))}
          class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3"
        >
          <div class="flex justify-between py-1">
            <h3 class="ml-1 text-sm">Todo</h3>
            <svg class="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
            </svg>
          </div>
          {
            todos.map((todo, idx) => (
              <Card
                todo={todo}
                onDrag={(event) => this.onDrag(event, todo, 'todos')}
                key={`todos-${todo.id}`}
              />
            )
            )
          }
        </div>
        <div
          onDrop={event => this.onDrop('ongoing')}
          onDragOver={(event => this.onDragOver(event))}
          class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3"
        >
          <div class="flex justify-between py-1">
            <h3 class="ml-1 text-sm">Ongoing</h3>
            <svg class="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
            </svg>
          </div>
          {
            ongoing.map((todo, idx) =>
              <Card
                todo={todo}
                onDrag={(event) => this.onDrag(event, todo, 'ongoing')}
                key={`ongoing-${todo.id}`}
              />
            )
          }
        </div>
        <div
          onDrop={event => this.onDrop('completed')}
          onDragOver={(event => this.onDragOver(event))}
          class="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3"
        >
          <div class="flex justify-between py-1">
            <h3 class="ml-1 text-sm">Ongoing</h3>
            <svg class="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
            </svg>
          </div>
          {
            completed.map((todo, idx) =>
              <Card
                todo={todo}
                onDrag={(event) => this.onDrag(event, todo, 'completed')}
                key={`completed-${todo.id}`}
              />
            )
          }
        </div>
      </div>
    );
  }
}
export default CardList