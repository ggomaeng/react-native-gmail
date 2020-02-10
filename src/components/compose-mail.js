/**
 * Created by ggoma on 2016. 11. 27..
 */
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from './colors';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  input: {
    height: 48,
    alignItems: 'center',
    padding: 8,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  default: {
    flex: 1,
    fontSize: 14,
    padding: 4,
    fontWeight: '400',
  },
  inputView: {
    borderWidth: 1,
    height: 32,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function ComposeMail(props) {
  const { lightGray, gray } = colors;
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
      }}
      {...props}
    >
      <View style={{
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: lightGray,
        borderBottomWidth: 0.7,
      }}>
        <TouchableOpacity
          onPress={props.onPress}
        >
          <Ionicons name='ios-arrow-back' color='gray' size={24} />
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Ionicons name='md-attach' color='gray' size={24} style={{ paddingRight: 24 }} />
          <Ionicons name='md-send' color='gray' size={24} />
        </View>
      </View>
      <View style={styles.input}>
        <TextInput style={styles.default} placeholder='To' placeholderTextColor={gray} />
      </View>
      <View style={styles.input}>
        <TextInput style={styles.default} placeholder='From' placeholderTextColor={gray} />
      </View>
      <View style={styles.input}>
        <TextInput style={styles.default} placeholder='Subject' placeholderTextColor={gray} />
      </View>
      <View style={[styles.input, { height: 500 }]}>
        <TextInput
          style={styles.default}
          multiline
          autoFocus
          placeholder='Compose email'
          placeholderTextColor={gray}
        />
      </View>
    </View>
  );
}
