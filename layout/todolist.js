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

const {width} = Dimensions.get('window');

export default class TodoList extends React.Component {
  state = {
    newTodoTitle: '',
    todos: {},
  };

  componentDidMount = () => {
    this._loadTodos();
  };

  _loadTodos = () => {
    this.setState({});
  };

  _addTodo = () => {
    const _id = uuid();
    const newTodo = {
      [_id]: {
        id: _id,
        title:
          this.state.newTodoTitle !== ''
            ? this.state.newTodoTitle
            : 'New Todo Title',
        description: '',
        dueDate: '',
        createdAt: Date.now(),
        priority: 3,
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
      return {...newState};
    });
  };

  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      return {...prevState, ...todos};
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

  _changeTitleText = text => {
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
            onChangeText={this._changeTitleText}
            onSubmitEditing={this._addTodo}
          />
          <TouchableOpacity style={styles.addButton} onPress={this._addTodo}>
            <Icon name="add" color="#bbbbbb" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.keys(this.state.todos).length !== 0 ||
          this.state.todos.constructor !== Object ? (
            Object.values(this.state.todos).map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={this._deleteTodo}
                completeStateToggle={this._completeToggle}
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
