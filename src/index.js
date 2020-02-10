/**
 * Created by ggoma on 2016. 11. 26..
 */
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Gmail from './components/gmail';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default function App(props) {
    return (
      <View
        style={styles.container}
        {...props}
      >
          <Gmail />
      </View>
    );
}
