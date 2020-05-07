import React from 'react';
import Header from './card-list-header'
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
          <Header title='Todo' />
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
          <Header title='Ongoing' />
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
          <Header title='Completed' />
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