import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Timestamp from './Timestamp';
import Message from './Message';
import Settings from './Settings';

export default class Bubble extends Component {
  static propTypes = {
    refresh: PropTypes.bool,
    item: PropTypes.object,
    showDate: PropTypes.bool,
    newMessage: PropTypes.bool,
    userMade: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.refresh = props.refresh;
    this.state = {
      pressed: false,
    };
  }
  shouldComponentUpdate = (prevProps, prevState) =>
    prevState.pressed !== this.state.pressed;

  onPressIn = () => {
    this.setState({pressed: true});
  };
  onPressOut = () => {
    this.setState({pressed: false});
  };

  render() {
    const {item, showDate, newMessage, userMade, onLongPress} = this.props;
    const timestamp =
      item[Settings.TIMESTAMP] instanceof Date
        ? item[Settings.TIMESTAMP]
        : new Date(item[Settings.TIMESTAMP]);
    const {pressed} = this.state;

    return (
      <View>
        {showDate && <Timestamp timestamp={timestamp} />}
        <TouchableWithoutFeedback
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onLongPress={onLongPress}>
          <View>
            <Message
              text={item[Settings.TEXT]}
              timestamp={timestamp}
              userMade={userMade}
              newMessage={newMessage}
              pressed={pressed}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
