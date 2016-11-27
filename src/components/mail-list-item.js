/**
 * Created by ggoma on 2016. 11. 26..
 */
import React, {Component} from 'react';
import {
Animated,
View,
Text,
Dimensions,
ScrollView,
TouchableOpacity,
PanResponder,
StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

import {randomHex, randomAlphabet} from './helpers';
import colors from './colors';
import { Ionicons } from '@exponent/vector-icons';

export default class MailListItem extends Component {
    constructor() {
        super();
        this.state = {
            star: false,
            height: new Animated.Value(88),
            offset: new Animated.Value(0),
            iconColor: randomHex(),
            deleted: false,
            released: false,
            alphabet: randomAlphabet()
        }

        this.scrollView = null;
        this.offset_x = 0;
        this.starPressed = this.starPressed.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({

            onPanResponderRelease: (e, gestureState) => {
                console.log('released');
                if(this.offset_x > 80) {
                    console.log('deleting list');
                    this.setState({deleted: true});
                    this.scrollView.scrollTo({x: -width});
                    Animated.timing(
                        this.state.height,
                        {
                            toValue: 0
                        }
                    ).start();
                    this.props.showUndo();
                }
                this.setState({released: true})
            }
        })
    }

    starPressed() {
        const {star} = this.state;
        this.setState({star : !star})
    }

    _onScroll(event) {
        if(this.state.deleted) {
            return
        }

        var e = event.nativeEvent;


        const xOffset = Math.abs(e.contentOffset.x);
        if (xOffset < 80) {
            this.state.offset.setValue(xOffset);
        }

        this.offset_x = xOffset;


    }

    renderArchive() {
        const { deleted , offset} = this.state;
        if(deleted) {
            return
        }

        return (
            <View>
                <Animated.View style={{position: 'absolute', left: 25, top: 30,
                            transform:[{scale: offset.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, 1]
                            })}]
                        }}>
                    <Ionicons name='md-archive' color='white' size={24}/>
                </Animated.View>

                <Animated.View style={{position: 'absolute', right: 25, top: 30,
                    transform:[{scale: offset.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1]
                })}]
                }}>
                    <Ionicons name='md-archive' color='white' size={24}/>
                </Animated.View>
            </View>

        )
    }


    render() {

        const {star, iconColor, alphabet, height} = this.state;
        const {yellow} = colors;

        return (

            <Animated.View
                style={{height: height, backgroundColor: '#3cba54'}}>
                {this.renderArchive()}

                <ScrollView
                    {...this._panResponder.panHandlers}
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    onScroll={this._onScroll}
                    scrollEventThrottle={1}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >

                    <View

                        style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: width, borderBottomColor: '#eee', borderBottomWidth: 1}}>
                        <View style={{width: 50, justifyContent: 'center', alignItems: 'center', paddingLeft: 14}} >
                            <View style={{backgroundColor: iconColor, height: 40, width: 40,
                        borderRadius: 40, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:'rgba(255,255,255,.5)', fontSize: 24, fontWeight: '700'}}>{alphabet}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, padding: 16, justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>Mail Title</Text>
                                <Text style={{fontSize: 12, color: '#3b60c4'}}>7:33 AM</Text>
                            </View>

                            <View style={{flexDirection: 'row', paddingRight: 24, paddingTop: 2}}>
                                <View>
                                    <Text style={{fontWeight: '700'}} ellipsizeMode="tail" numberOfLines={1}>
                                        Some description goes here here here here here here herhehre
                                    </Text>
                                    <Text style={{color: 'gray', paddingTop: 2}} ellipsizeMode="tail" numberOfLines={1}>
                                        The mail content description goes here here here heere
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.starPressed} style={{padding: 12}}>
                                    <Ionicons name={star ? 'md-star' : 'md-star-outline'} color={star ? yellow : 'gray'} size={24} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        )
    }
}