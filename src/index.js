import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    RefreshControl
} from 'react-native'

/* Packages */
import PropTypes from 'prop-types';

import AnimatedParallaxHeader from './AnimatedParalaxHeader';

class KeyboardAwareAnimatedScrollView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        };

        /*
            When passign `refreshControl` the moduel crashes 
            I did try out with `Animated.ScrollView` and it works liek a charm.
            So there is a problem with the module somewhere.
        */
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AnimatedParallaxHeader
                    title={'KeyboardAwareAnimatedScrollView'}
                    backgroundImage={{ uri: 'http://blog.juliaebert.com/images/material-bg-10.png' }}
                    stickyComponent={
                        <View style={styles.sticky_container}>
                            <Text>Im a sticky header</Text>
                        </View>
                    }
                    /* !IMPORTANT Comment out `refreshControl` to fix it. */
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={
                                () => {
                                    this.setState({ refreshing: true });

                                    /* Simulate Fetch Request */
                                    setTimeout(
                                        () => {
                                            this.setState({ refreshing: false });
                                        }, 2000
                                    )
                                }
                            }
                        />
                    }
                >
                    <View style={styles.container} >
                        <View style={styles.card}>
                            <Text>Some text</Text>
                        </View>
                        <View style={styles.card}>
                            <Text>Some text</Text>
                        </View>
                        <View style={styles.card}>
                            <Text>Some text</Text>
                        </View>
                        <View style={styles.card}>
                            <Text>Some text</Text>
                        </View>
                    </View>
                </AnimatedParallaxHeader>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    card: {
        height: 200,
        backgroundColor: "#BDBDBD",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    sticky_container: {
        minHeight: 80,
        backgroundColor: "#FF5722",
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default KeyboardAwareAnimatedScrollView