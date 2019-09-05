import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Todo from '../component/todo';
import {Icon} from 'react-native-elements';
import uuid from 'uuid/v1';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');

export default class TodoList extends React.Component {
  state = {
    newTodoTitle: '',
    todos: {},
  };

  componentDidMount = () => {
    this._loadTodos();
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

  _addTodo = () => {
    const _id = uuid();
    const now = moment().format('YYYY[-]MM[-]DD');
    const newTodo = {
      [_id]: {
        id: _id,
        title:
          this.state.newTodoTitle !== ''
            ? this.state.newTodoTitle
            : 'New Todo Title',
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
        newTodoTitle: '',
      };
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
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
      this._saveTodo(newState.todos);
      return {...newState};
    });
  };

  _changeNewTitleText = text => {
    this.setState({newTodoTitle: text});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder={'New Todo title'}
            autoCorrect={false}
            returnKeyType={'done'}
            value={this.state.newTodoTitle}
            onChangeText={this._changeNewTitleText}
            onSubmitEditing={this._addTodo}
          />
          <TouchableOpacity style={styles.addButton} onPress={this._addTodo}>
            <Icon name="add" color="#bbbbbb" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.keys(this.state.todos).length !== 0 ||
          this.state.todos.constructor !== Object ? (
            Object.values(this.state.todos)
              .reverse()
              .map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={this._deleteTodo}
                  completeStateToggle={this._completeToggle}
                  changeTitleText={this._changeTitleText}
                  changeDescriptionText={this._changeDescriptionText}
                  changePriority={this._changePriority}
                  changeDueDate={this._changeDueDate}
                />
              ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Add New To-Do</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    elevation: 5,
  },
  inputText: {flex: 10, fontSize: 20},
  addButton: {flex: 1, alignItems: 'flex-end'},
  emptyContainer: {
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c3735',
    padding: 5,
    elevation: 5,
  },
  emptyText: {
    fontSize: 30,
    color: '#ffffff',
  },
});
