import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';

export default class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dueDateMark: {
        [this.props.todo.dueDate]: {
          selected: true,
          selectedColor: '#9bc53b',
        },
      },
    };
  }

  _toggleModalVisible = () => {
    setTimeout(
      () =>
        this.setState(prevState => {
          return {
            isModalVisible: !prevState.isModalVisible,
          };
        }),
      0,
    );
  };

  _changeMark = day => {
    const newMark = {
      [day.dateString]: {
        selected: true,
        selectedColor: '#9bc53b',
      },
    };
    this.setState({dueDateMark: newMark});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.isEditable ? (
          <TextInput
            style={styles.title}
            value={this.props.todo.title}
            onChangeText={text =>
              this.props.changeTitleText(this.props.todo.id, text)
            }
          />
        ) : (
          <Text style={styles.titleText}>{this.props.todo.title}</Text>
        )}

        <View style={styles.stateContainer}>
          <View style={styles.completeContainer}>
            <Text style={styles.text}>Completed : </Text>
            {this.props.todo.isCompleted ? (
              <Icon name="done" />
            ) : (
              <Icon name="close" />
            )}
          </View>

          <View style={styles.priorityContainer}>
            <Text style={styles.text}>Priority : </Text>
            {this.props.isEditable ? (
              <Picker
                style={styles.priorityPicker}
                selectedValue={this.props.todo.priority}
                onValueChange={itemValue =>
                  this.props.changePriority(this.props.todo.id, itemValue)
                }>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
              </Picker>
            ) : (
              <Text style={styles.text}>{this.props.todo.priority}</Text>
            )}
          </View>
        </View>
        <View style={styles.dueDateContainer}>
          <Text style={styles.text}>End Date :</Text>
          {this.props.todo.dueDate === '' ? (
            <Text style={styles.text}> Please choosing Due Date </Text>
          ) : (
            <Text> {this.props.todo.dueDate} </Text>
          )}
          <TouchableOpacity onPress={this._toggleModalVisible}>
            <Icon name="event" />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={this._toggleModalVisible}>
          <View style={styles.calendarModalContainer}>
            <View style={styles.calendarModal}>
              <TouchableOpacity
                style={styles.calendarCloseButton}
                onPress={this._toggleModalVisible}>
                <Icon name="close" />
              </TouchableOpacity>
              <Calendar
                onDayPress={day => {
                  this.props.changeDueDate(this.props.todo.id, day.dateString);
                  this._toggleModalVisible();
                  this._changeMark(day);
                }}
                markedDates={this.state.dueDateMark}
                minDate={this.props.todo.createdAt}
              />
            </View>
          </View>
        </Modal>
        {this.props.isEditable ? (
          <TextInput
            value={this.props.todo.description}
            onChangeText={text =>
              this.props.changeDescriptionText(this.props.todo.id, text)
            }
            placeholder="Type description"
            multiline={true}
          />
        ) : (
          <Text style={styles.descriptionText}>
            explain : {this.props.todo.description}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe1a8',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 20,
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
    padding: 5,
    paddingBottom: 10,
  },
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.5)',
  },
  calendarModal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    marginVertical: 100,
    elevation: 5,
  },
  calendarCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#723d46',
    borderBottomWidth: 1,
    padding: 5,
  },
  stateContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  completeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 15,
    padding: 5,
  },
  priorityPicker: {
    flex: 1,
  },
});
