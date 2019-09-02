import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#472d30" />
        <Text style={styles.title}>To-Do List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#472d30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 50,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
