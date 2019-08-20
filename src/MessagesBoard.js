import React, {PureComponent} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';

export default class MessagesBoard extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    user: PropTypes.object,
    loadEarlier: PropTypes.func,
    loading: PropTypes.bool,
    onBubbleLongPress: PropTypes.func,
  };

  renderMessage = ({item, index}) => {
    const {user: owner, data} = this.props;
    let {timestamp, user, system} = item;

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

    if (system) return <SystemMessage {...item} />;

    const continuation =
      data[index + 1] &&
      data[index + 1].user &&
      !showDate &&
      data[index + 1].user.id === user.id;

    return (
      <Bubble
        refresh={showDate}
        item={item}
        showDate={showDate}
        continuation={continuation}
        userMade={owner.id === user.id}
        onLongPress={this.onLongPress}
      />
    );
  };

  render() {
    const {data, loadEarlier, loading} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          renderItem={this.renderMessage}
          keyExtractor={this.keyExtractor}
          inverted
          removeClippedSubviews={true}
          keyboardShouldPersistTaps={'always'}
          onEndReachedThreshold={0.25}
          onEndReached={!loading && loadEarlier}
          ListFooterComponent={this.renderLoadingEarlier}
        />
      </View>
    );
  }

  renderLoadingEarlier = () => {
    if (this.props.renderLoadingEarlier) this.props.renderLoadingEarlier();
    else
      return <ActivityIndicator style={styles.loadingEarlier} size={'large'} />;
  };

  onLongPress = () => {
    if (this.props.onBubbleLongPress) this.props.onBubbleLongPress();
    else Alert.alert('Pressed');
  };

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
  loadingEarlier: {
    marginVertical: 10,
    color: '#F5F5F5',
    alignSelf: 'center',
  },
});
