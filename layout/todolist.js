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

const {height, width} = Dimensions.get('window');

export default class TodoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder={'New Todo title'}
            autoCorrect={false}
          />
          <TouchableOpacity>
            <Text>➕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Todo />
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
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  inputText: {flex: 1, fontSize: 20},
});
