import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from './Text';

export default ({
  text,
  timestamp,
  messageContainer,
  userMade,
  messageContent,
  continuation,
}) => {
  return (
    <View
      style={[
        styles.container,
        userMade ? styles.right : styles.left,
        continuation ? styles.continuation : null,
        messageContainer,
      ]}>
      <Text style={[styles.content, messageContent]}>{text}</Text>
      <Text style={[styles.time]}>{renderTime(timestamp)}</Text>
    </View>
  );
};

const renderTime = timestamp => {
  if (!(timestamp instanceof Date)) timestamp = new Date(timestamp);
  return (
    addZeros(String(timestamp.getHours())) +
    ':' +
    addZeros(String(timestamp.getMinutes()))
  );
};

const addZeros = str => {
  if (str.length < 2) return '0' + str;
  else return str;
};

const OTHER_BACKGROUND_COLOR = '#FFFFFF';
const USER_BACKGROUND_COLOR = '#B2F195';

const styles = StyleSheet.create({
  container: {
    minWidth: 50,
    maxWidth: 300,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 4,
    borderRadius: 4,
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: OTHER_BACKGROUND_COLOR,
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: USER_BACKGROUND_COLOR,
  },
  content: {
    fontSize: 15,
    paddingBottom: 4,
  },
  continuation: {
    marginTop: 2,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
  },
});
