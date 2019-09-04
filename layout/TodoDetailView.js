import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default class TodoDetailView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.todo.title}</Text>
        <Text>{this.props.todo.description}</Text>
        <Text>{this.props.todo.dueDate}</Text>
        <Text>{this.props.todo.priority}</Text>
        <Text>{this.props.todo.isCompleted}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffe1a8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
