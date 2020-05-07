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
          task: 'Todo-1'
        }
      ],
      completed: [
        {
          id: 3,
          task: 'Todo-1'
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

  onAdd = (event, key) => {
    event.preventDefault()
    const cards = this.state[key]
    const size = cards.length + 1
    const card = {
      id: size,
      task: `Todo-${size}`
    }

    this.setState({
      [key]: [...cards, card]
    })
  }

  render() {
    const { todos, completed, ongoing } = this.state;
    const data = [{
      name: 'todos',
      value: todos
    }, {
      name: 'ongoing',
      value: ongoing
    }, {
      name: 'completed',
      value: completed
    }]

    return (
      <div className="flex px-4 pb-8 items-start overflow-x-scroll">
        {
          data.map(({ name, value }) => (
            <div
              key={name}
              onDrop={event => this.onDrop(name)}
              onDragOver={(event => this.onDragOver(event))}
              className="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3"
            >
              <Header title={name} />
              {
                value.map((todo, idx) => (
                  <Card
                    key={idx}
                    todo={todo}
                    onDrag={(event) => this.onDrag(event, todo, name)}
                    id={`${name}-${todo.id}`}
                  />
                ))
              }
              <p onClick={event => this.onAdd(event, name)} className='mt-8 p-2 pl-0 text-grey-dark cursor-pointer'>Add a card...</p>
            </div>
          ))
        }
      </div>
    )
  }
}
export default CardList