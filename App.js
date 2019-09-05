import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import TodoList from './layout/todolist';
import AppTitleHeader from './component/AppTitleHeader';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#5c3735" />
        <AppTitleHeader />
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
});
