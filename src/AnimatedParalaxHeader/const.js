import {
    Platform,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("window");

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

var STATUSBAR_HEIGHT = 24;

if (Platform.OS === 'ios') {
    STATUSBAR_HEIGHT = 20;
};

const HEIGHT = STATUSBAR_HEIGHT + APPBAR_HEIGHT;

/* AnimatedHeaderScrollview */
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_MIN_HEIGHT = HEIGHT;
const HEADER_SCROLL_DISTANCE = (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT);

export {
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    HEADER_SCROLL_DISTANCE,
    APPBAR_HEIGHT,
    STATUSBAR_HEIGHT
}