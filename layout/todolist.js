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

const {width} = Dimensions.get('window');

export default class TodoList extends React.Component {
  state = {
    todos: [],
    newTodoTitle: '',
  };

  todoCallback = todoFromChild => {
    this.setState(prevState => ({
      todos: [todoFromChild, ...prevState.todos],
    }));
  };

  _addTodo = () => {
    const newTodo = {
      title:
        this.state.newTodoTitle !== ''
          ? this.state.newTodoTitle
          : 'New Todo Title',
      description: '',
      dueDate: '',
      createdAt: Date.now(),
      priority: 3,
      isCompleted: false,
    };
    this.setState(prevState => ({
      todos: [newTodo, ...prevState.todos],
      newTodoTitle: '',
    }));
  };

  _deleteTodo = createdAt => {
    this.setState(prevState => {
      const index = prevState.todos.findIndex(e => e.createdAt === createdAt);
      prevState.todos.splice(index, 1);
      return {
        todos: [...prevState.todos],
      };
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
          {this.state.todos.length ? (
            this.state.todos.map(todo => (
              <Todo
                key={todo.createdAt}
                todo={todo}
                deleteTodo={this._deleteTodo}
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
    backgroundColor: '#723d46',
    padding: 5,
    elevation: 5,
  },
  emptyText: {
    fontSize: 30,
    color: '#ffffff',
  },
});
