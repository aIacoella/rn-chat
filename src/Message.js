import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Text} from './Text';
import ParsedText from 'react-native-parsed-text';

export default ({
  text,
  timestamp,
  styleMessageContainer,
  userMade,
  styleMessageContent,
  continuation,
  pressed,
}) => {
  return (
    <View
      style={[
        styles.container,
        userMade ? styles.right : styles.left,
        continuation ? styles.continuation : null,
        pressed ? styles.pressed : null,
        styleMessageContainer,
      ]}>
      <MessageText style={[styles.content, styleMessageContent]}>
        {text}
      </MessageText>
      <Text style={[styles.time]}>{renderTime(timestamp)}</Text>
    </View>
  );
};

export const MessageText = ({children, ...rest}) => {
  return (
    <ParsedText {...rest} parse={MESSAGE_PARSER}>
      {children}
    </ParsedText>
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
  pressed: {
    backgroundColor: '#D1FCFF',
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

  link: {
    color: '#0645AD',
    textDecorationLine: 'underline',
  },
});

const handleLinkPress = link => Alert.alert(`${link} pressed!`);

const MESSAGE_PARSER = [
  {type: 'url', style: styles.link, onPress: handleLinkPress},
  {type: 'phone', style: styles.link, onPress: handleLinkPress},
  {type: 'email', style: styles.link, onPress: handleLinkPress},
  {pattern: /#(\w+)/, style: styles.link, onPress: handleLinkPress},
];
