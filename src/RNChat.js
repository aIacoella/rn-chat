import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import MessagesBoard from './MessagesBoard';
import Input from './Input';
import Settings from './Settings';

export default class RNChat extends Component {
  constructor(props) {
    super(props);
    Settings.syntax = props.syntax;
  }

  static propTypes = {
    containerStyle: PropTypes.object,
    data: PropTypes.array.isRequired,
    onSend: PropTypes.func.isRequired,

    syntax: PropTypes.object,
  };

  renderInput = () => {
    return <Input {...this.props} />;
  };

  render() {
    const {containerStyle} = this.props;

    return (
      <View style={[styles.containerStyle, containerStyle]}>
        <MessagesBoard {...this.props} />
        {this.renderInput()}
      </View>
    );
  }
}

RNChat.defaultProps = {
  syntax: {
    message: {},
    user: {},
  },
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});
