import React from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import Accordion from 'react-native-collapsible';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      isEditMode: false,
    };
  }

  _toggleCompletedCheck = () => {
    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        isCompleted: !prevState.todo.isCompleted,
      },
    }));
  };

  _toggleEditMode = () => {
    this.setState(prevState => {
      return {
        isEditMode: !prevState.isEditMode,
      };
    });
  };

  _changeTitleText = text => {
    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        title: text,
      },
    }));
  };

  _titleTextFocus = () => {
    setTimeout(() => this.titleText.focus(), 0);
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          style={styles.checkbox}
          checked={this.state.todo.isCompleted}
          onPress={this._toggleCompletedCheck}
          checkedColor={'#9bc53b'}
        />
        <TouchableOpacity
          style={styles.titleBar}
          onLongPress={() => {
            this._toggleEditMode();
            this._titleTextFocus();
          }}>
          <TextInput
            style={
              this.state.todo.isCompleted
                ? styles.CompletedTitleText
                : styles.UncompletedTitleText
            }
            editable={this.state.isEditMode}
            onChangeText={this._changeTitleText}
            value={this.state.todo.title}
            returnKeyType={'done'}
            onEndEditing={this._toggleEditMode}
            ref={ref => (this.titleText = ref)}
          />
        </TouchableOpacity>

        {this.state.isEditMode ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._toggleEditMode}>
              <Icon name="check" color="#bbbbbb" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this._toggleEditMode();
                this._titleTextFocus();
              }}>
              <Icon name="create" color="#bbbbbb" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.deleteTodo(this.state.todo.createdAt)}>
              <Icon name="delete" color="#bbbbbb" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

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
