import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import TodoDetailView from '../layout/TodoDetailView';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailViewOpen: false,
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

  _toggleDetailViewVisible = () => {
    this.setState(prevState => {
      return {
        isDetailViewOpen: !prevState.isDetailViewOpen,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
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
            onPress={this._toggleDetailViewVisible}>
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
            <TouchableOpacity style={styles.button}>
              <Icon name="create" color="#bbbbbb" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.deleteTodo(this.props.todo.id)}>
              <Icon name="delete" color="#bbbbbb" />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isDetailViewOpen ? (
          <View style={styles.detailView}>
            <TodoDetailView
              isEditMode={this.state.isEditMode}
              todo={this.props.todo}
              toggleDetailViewVisible={this._toggleDetailViewVisible}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c3735',
    borderRadius: 5,
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
  detailView: {
    paddingHorizontal: 5,
  },
});
