



import './App.css';
import React, { Component } from 'react'




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      value: "",


      // Add the folowing three for editing related
      editing: false,
      currentid: "",
      currentValue: "",
    }
  }


  handleChange = (e) => {
    this.setState(
      {
        value: e.target.value
      }
    )
  }


  displayItem = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.value,
      id: new Date().getTime()
    }


    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(obj) });
      this.setState({ value: "" });
    }
    console.log(this.state.todos);
  //   localStorage.setItem("todos", JSON.stringify(this.state.value));
  }


  handleDelete = (index) => {
    this.state.todos = [...this.state.todos].filter((items) => items.id !== index)
    console.log(this.state.todos)


    this.setState({
      value: this.setState.todos
    })
  //  localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }


  // EDIT RELATED FUNCTIONS
  // #######################


  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  };


  onSubmitEditTodo = (e) => {
    e.preventDefault();
    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };


  onToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
//    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };


  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };


  render() {




    return (
      <>
        <div className='headerStyle'>
          <h1>React TODO List</h1>
        </div>
        <div className="formOuterStyle">
          {this.state.editing === false ? (
            <form onSubmit={this.displayItem} ref="dataForm">
              <input
                placeholder="type your task"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button onClick={this.displayItem}>Add Item</button>
            </form>
          ) : (
            <form onSubmit={this.onSubmitEditTodo}>
              <input
                placeholder="edit your task"
                value={this.state.currentValue}
                name={this.state.currentValue}
                onChange={this.onEditInputChange}
              />
              <button onClick={this.onSubmitEditTodo}>Update Item</button>
            </form>
          )}




        </div>
        {this.state.todos.map((todo) => (
        <li className="todo_item">
          {todo.name}
            <button className="editBtn" onClick={() => this.onToggleEdit(todo)}>Edit</button>
            <button className="removeBtn"  onClick={() => this.handleDelete(todo.id)}>Remove</button>
        </li>
        ))};
      </>


    );
  }
}






export default App;
