import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import MessagesBoard from './MessagesBoard';
import Input from './Input';

export default class RNChat extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    data: PropTypes.array.isRequired,
    onSend: PropTypes.func.isRequired,
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

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});
