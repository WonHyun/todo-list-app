import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import TodoList from './layout/todolist';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#472d30" />
        <Text style={styles.title}>To-Do List</Text>
        <TodoList />
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
  title: {
    fontSize: 50,
    marginTop: 30,
    marginBottom: 30,
    color: '#ffffff',
  },
});
