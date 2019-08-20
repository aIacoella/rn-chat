import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Timestamp from './Timestamp';
import Message from './Message';

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
    console.log('Ao');
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
        {showDate && <Timestamp timestamp={item.timestamp} />}
        <TouchableWithoutFeedback
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onLongPress={onLongPress}>
          <View>
            <Message
              {...item}
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
