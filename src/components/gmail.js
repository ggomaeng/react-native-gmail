/**
 * Created by ggoma on 2016. 11. 26..
 */
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Header from './header';
import MailList from './mail-list';
import ComposeMail from './compose-mail';

import ActionButton from 'react-native-action-button';
import { Ionicons as Icon } from '@expo/vector-icons';
import colors from './colors';


const { width } = Dimensions.get('window');

export default class Gmail extends Component {
  constructor() {
    super();
    this.state = {
      undoHeight: new Animated.Value(0),
      offset: 0,
      undoShown: false,
      modal: false,
    };
    this.showUndo = this.showUndo.bind(this);
    this.hideUndo = this.hideUndo.bind(this);

  }

  showUndo() {
    if (this.state.undoShown) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.hideUndo();
      }, 3000);
      return;
    }

    console.log('showing undo');

    this.setState({ undoShown: true });
    var height = 42;

    var i = 0;
    this.interval = setInterval(() => {
      if (i > height) {
        clearInterval(this.interval);
      }
      this.setState({ offset: i });
      i += 3;
    }, 3);
    Animated.timing(
      this.state.undoHeight,
      {
        toValue: height,
      },
    ).start();


    this.timeout = setTimeout(() => {
      this.hideUndo();
    }, 3000);

  }

  hideUndo() {
    if (!this.state.undoShown) {
      return;
    }

    console.log('hiding undo');
    Animated.timing(
      this.state.undoHeight,
      {
        toValue: 0,
      },
    ).start();

    this.setState({ undoShown: false });
    var height = 0;

    var i = 42;
    this.interval = setInterval(() => {
      if (i < height) {
        clearInterval(this.interval);
      }
      this.setState({ offset: i });
      i -= 3;
    }, 3);

  }

  renderUndo() {
    const { undoHeight, undoShown } = this.state;
    const { black, lightBlue } = colors;
    var opacity = this.state.undoHeight.interpolate({
      inputRange: [0, 42],
      outputRange: [0, 1],
    });


    return (
      <Animated.View style={{ height: undoHeight, width, position: 'absolute', bottom: 0, backgroundColor: black }}>
        <Animated.View
          style={{ flex: 1, opacity, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ paddingLeft: 16, color: 'white' }}>Message archived.</Text>
          <TouchableOpacity>
            <Text style={{ paddingRight: 16, color: lightBlue, fontWeight: '700' }}>UNDO</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  renderFOB() {
    const { offset } = this.state;
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        icon={<Icon name='md-create' style={styles.actionButtonIcon} />}
        offsetY={offset}
        offsetX={0}
        onPress={() => {
          this.setState({ modal: true });
        }}
      />
    );
  }

  renderModal() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modal}
        onRequestClose={() => {
        }}
      >
        <ComposeMail onPress={() => this.setState({ modal: false })} />
      </Modal>
    );
  }

  render() {
    const { modal } = this.state;


    return (
      <View style={{ flex: 1 }}>
        <StatusBar animated={true} barStyle={modal ? 'default' : 'light-content'} />
        <Header />
        <MailList showUndo={this.showUndo} />
        {this.renderFOB()}
        {this.renderUndo()}
        {this.renderModal()}
      </View>
    );
  }


}

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
