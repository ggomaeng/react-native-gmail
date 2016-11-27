/**
 * Created by ggoma on 2016. 11. 26..
 */
import React, {Component} from 'react';
import {
View,
Text,
} from 'react-native';

import { Ionicons } from '@exponent/vector-icons';
import colors from './colors';

export default class Header extends Component {

    render() {
        const {red} = colors;
        return (
            <View style={{height: 70, backgroundColor: red, paddingTop: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 12}}>
                    <Ionicons name="md-menu" size={24} color="white" />
                    <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>Primary</Text>
                    <Ionicons name="md-search" size={24} color="white" />
                </View>
            </View>
        )
    }
}