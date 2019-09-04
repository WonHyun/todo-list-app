import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Icon} from 'react-native-elements';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
    };
  }

  _toggleEditMode = () => {
    this.setState(prevState => {
      return {
        isEditMode: !prevState.isEditMode,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          checked={this.props.todo.isCompleted}
          onPress={() =>
            this.props.completeStateToggle(
              this.props.todo.id,
              this.props.todo.isCompleted,
            )
          }
          checkedColor={'#9bc53b'}
        />
        <TouchableOpacity
          style={styles.titleBar}
          onLongPress={() => {
            this._toggleEditMode();
          }}>
          <Text
            style={
              this.props.todo.isCompleted
                ? styles.CompletedTitleText
                : styles.UncompletedTitleText
            }>
            {this.props.todo.title}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this._toggleEditMode();
            }}>
            <Icon name="create" color="#bbbbbb" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.deleteTodo(this.props.todo.id)}>
            <Icon name="delete" color="#bbbbbb" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/* <View style={styles.buttonContainer}>
<TouchableOpacity
  style={styles.button}
  onPress={this._toggleEditMode}>
  <Icon name="check" color="#bbbbbb" />
</TouchableOpacity>
</View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#472d30',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
  },
  titleBar: {
    flex: 3,
  },
  UncompletedTitleText: {
    fontSize: 20,
    color: '#ffffff',
  },
  CompletedTitleText: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: '#bbbbbb',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  checkbox: {
    flex: 1,
  },
});
