import React from 'react';
import {StyleSheet, View, StatusBar, AppState} from 'react-native';
import TodoList from './layout/todolist';
import AppTitleHeader from './component/AppTitleHeader';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid/v1';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      expiredTodos: [],
      todos: {},
    };
  }

  // when app component first loaded, load to saved todos and tracking app state
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._loadTodos();
  };

  // when app closed, remove app state changed event listener
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  // when app state is background, save current todos to asyncStorage (local storage)
  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      this._saveTodo(this.state.todos);
    }
    this.setState({appState: nextAppState});
  };

  // save current todos to asyncStorage
  _saveTodo = newTodos => {
    AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // load saved todos from asyncStorage
  _loadTodos = async () => {
    try {
      const getSavedTodos = await AsyncStorage.getItem('todos');
      let savedTodos = JSON.parse(getSavedTodos);
      savedTodos = savedTodos === null ? {} : savedTodos; // null check
      const expiredTodos = await this._findExpiredTodo(savedTodos); // search expired todos
      this.setState({todos: savedTodos, expiredTodos: expiredTodos});
    } catch (err) {
      console.log(err);
    }
  };

  // callback function
  // if you want add new todo in todo list, call this function from child
  _addTodo = newTodoTitle => {
    const _id = uuid(); // name(id) each todo element in todos
    const now = moment().format('YYYY[-]MM[-]DD');
    const newTodo = {
      [_id]: {
        id: _id,
        title: newTodoTitle !== '' ? newTodoTitle : 'New Todo Title',
        description: '',
        dueDate: '',
        createdAt: now,
        priority: '3',
        isCompleted: false,
      },
    };
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          ...newTodo,
        },
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if you want delete one todo, call this function from child
  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if you want delete many todos, call this function from child
  _deleteManyTodo = todoList => {
    this.setState(prevState => {
      const todos = prevState.todos;
      todoList.map(todo => {
        delete todos[todo.id];
      });
      const newState = {
        ...prevState,
        ...todos,
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if child component's complete state changed, call this function from child
  _completeToggle = (id, currentCompleteState) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: !currentCompleteState,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's title text changed, call this function from child
  _changeTitleText = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            title: text,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's description changed, call this function from child
  _changeDescriptionText = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            description: text,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's priority changed, call this function from child
  _changePriority = (id, prior) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            priority: prior,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's due date changed, call this function from child
  _changeDueDate = (id, date) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            dueDate: date,
          },
        },
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // find Expired Todos in new state of todos
  _findExpiredTodo = todos => {
    let now = new Date();
    let expired = [];
    Object.values(todos).map(todo => {
      if (todo.dueDate !== '') {
        // convert date string to date type object
        let splited = todo.dueDate.split('-');
        let dueDate = new Date(
          splited[0],
          splited[1] - 1,
          splited[2],
          23,
          59,
          59,
        );
        if (dueDate < now) {
          expired.push(todo);
        }
      }
    });
    return expired;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#5c3735" />
        <AppTitleHeader
          expiredTodos={this.state.expiredTodos}
          deleteTodo={this._deleteTodo}
          deleteManyTodo={this._deleteManyTodo}
        />
        <TodoList
          todos={this.state.todos}
          addTodo={this._addTodo}
          deleteTodo={this._deleteTodo}
          completeStateToggle={this._completeToggle}
          changeTitleText={this._changeTitleText}
          changeDescriptionText={this._changeDescriptionText}
          changePriority={this._changePriority}
          changeDueDate={this._changeDueDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
