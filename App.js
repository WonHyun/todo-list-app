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
      todos: {},
    };
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._loadTodos();
  };

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      this._saveTodo(this.state.todos);
    }
    this.setState({appState: nextAppState});
  };

  _saveTodo = newTodos => {
    AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  _loadTodos = async () => {
    try {
      const getSavedTodos = await AsyncStorage.getItem('todos');
      let savedTodos = JSON.parse(getSavedTodos);
      savedTodos = savedTodos === null ? {} : savedTodos;
      this.setState({todos: savedTodos});
    } catch (err) {
      console.log(err);
    }
  };

  _addTodo = newTodoTitle => {
    const _id = uuid();
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
      return {...newState};
    });
  };

  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      return {newState};
    });
  };

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
      return {...newState};
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#5c3735" />
        <AppTitleHeader />
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
