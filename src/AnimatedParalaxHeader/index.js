import React, { Component } from 'react';
import {
    Animated,
    Text,
    View,
    Image,
    Keyboard,
} from 'react-native';

/* Packages */
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/* Components */
const KeyboarAwareAnimatedScrollView = Animated.createAnimatedComponent(
    KeyboardAwareScrollView
);

/* Constants */
import { HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, } from './const';

/* Styles */
import styles from './styles';

class AnimatedParallaxHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            height: 0,
        };
    };

    renderStickyHeader() {
        const { stickyComponent } = this.props;

        if (stickyComponent) {
            return (
                <Animated.View
                    onLayout={
                        (e) => {
                            const { height } = e.nativeEvent.layout;

                            this.setState({
                                height: height
                            });
                        }
                    }
                    style={[
                        {
                            position: 'absolute',
                            top: HEADER_MAX_HEIGHT,
                            left: 0,
                            right: 0,
                        },
                        { transform: [{ translateY: this.headerTranslate }] },
                    ]}
                >
                    {stickyComponent}
                </Animated.View>
            );
        };

        return null;
    };

    renderBackgroundImage() {
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const overlayBackground = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0.2, 0.2, 0],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                pointerEvents={'none'}
                style={[
                    styles.header,
                    { transform: [{ translateY: this.headerTranslate }] },
                ]}
            >
                <Animated.Image
                    style={[
                        styles.backgroundImage,
                        {
                            opacity: imageOpacity,
                            transform: [{ translateY: imageTranslate }],
                        },
                    ]}
                    source={this.props.backgroundImage}
                />
                <Animated.View
                    style={[
                        styles.overlay, {
                            backgroundColor: 'black',
                            opacity: overlayBackground,
                        }
                    ]}
                />
            </Animated.View>
        );
    };

    renderTitle() {
        const { title } = this.props;

        if (title.length > 0) {
            return (
                <Animated.View
                    pointerEvents={'none'}
                    style={[
                        styles.bar,
                        styles.title_container, {
                            transform: [{ translateY: this.headerTranslate },],
                        }
                    ]}
                >
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {title}
                    </Text>
                </Animated.View>
            );
        };

        return null;
    };

    scrollToBottm() {
        if (this.scroll) {
            this.scroll.scrollToEnd({ animated: true });
        };
    };

    render() {
        this.headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -(HEADER_SCROLL_DISTANCE)],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <KeyboarAwareAnimatedScrollView
                    contentContainerStyle={{ backgroundColor: 'transparent', flexGrow: 1, }}
                    scrollEventThrottle={1}
                    bounces={false}
                    automaticlyAdjustContentInsets={false}
                    keyboardDismissMode={'interactive'}
                    keyboardShouldPersistTaps={'handled'}
                    enableResetScrollToCoords={false}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    innerRef={
                        (ref) => {
                            this.scroll = ref;
                        }
                    }
                    refreshControl={this.props.refreshControl}
                >
                    <View
                        style={{
                            marginTop: HEADER_MAX_HEIGHT + this.state.height
                        }}
                    >
                        {this.props.children}
                    </View>
                </KeyboarAwareAnimatedScrollView>
                {this.renderBackgroundImage()}
                {this.renderStickyHeader()}
                {this.renderTitle()}
            </View>
        );
    }
};

AnimatedParallaxHeader.defaultProps = {
    title: '',
    backgroundImage: '',

    refreshControl: null,
    stickyComponent: null,
};

AnimatedParallaxHeader.propTypes = {
    title: PropTypes.string,
    backgroundImage: Image.propTypes.source,

    refreshControl: PropTypes.element,
    stickyComponent: PropTypes.element,
};

export default AnimatedParallaxHeader;