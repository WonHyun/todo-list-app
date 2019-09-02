import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleBar}>
          <Text style={styles.titleText}>text</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>📝</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#472d30',
    borderRadius: 5,
    marginBottom: 10,
  },
  titleBar: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
});
