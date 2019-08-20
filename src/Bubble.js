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
    continuation: PropTypes.bool,
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
    const {item, showDate, continuation, userMade, onLongPress} = this.props;
    const {pressed} = this.state;

    return (
      <View>
        {showDate && <Timestamp timestamp={item[Settings.TIMESTAMP]} />}
        <TouchableWithoutFeedback
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onLongPress={onLongPress}>
          <View>
            <Message
              text={item[Settings.TEXT]}
              timestamp={item[Settings.TIMESTAMP]}
              userMade={userMade}
              continuation={continuation}
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
