/**
 * Created by ggoma on 2016. 11. 26..
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Gmail from './components/gmail';
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Gmail />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});