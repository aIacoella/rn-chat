import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from './Text';
import MessageContainer from './MessageContainer';
import Timestamp from './Timestamp';
import Message from './Message';
import {User1} from './Data';

export default class MessagesBoard extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    user: PropTypes.object,
  };

  renderMessage = ({item, index}) => {
    const {user: owner, data} = this.props;
    let {timestamp, user} = item;
    timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);

    let showDate = index == data.length - 1;
    if (!showDate) {
      const currentDate = timestamp.getDate();
      const nextDate =
        data[index + 1].timestamp instanceof Date
          ? data[index + 1].timestamp.getDate()
          : new Date(data[index + 1].timestamp).getDate();
      showDate = currentDate !== nextDate;
    }
    const continuation =
      index + 1 !== data.length &&
      !showDate &&
      data[index + 1].user.id === user.id;

    return (
      <MessageContainer refresh={showDate}>
        {showDate && <Timestamp timestamp={timestamp} />}
        <Message
          {...item}
          userMade={owner.id === user.id}
          continuation={continuation}
        />
      </MessageContainer>
    );
  };

  render() {
    const {data} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          renderItem={this.renderMessage}
          keyExtractor={this.keyExtractor}
          inverted
          removeClippedSubviews={true}
        />
      </View>
    );
  }

  keyExtractor = item => item.id;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingHorizontal: 15,
  },
});
