import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get("window");

/* Const */
import { HEADER_MAX_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT } from './const';

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D84315',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        height: HEADER_MAX_HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title_container: {
        alignSelf: 'center',
        maxWidth: width - (APPBAR_HEIGHT * 2),
        left: APPBAR_HEIGHT,
        ...Platform.select({
            ios: {
                paddingBottom: 0,
            },
            android: {
                paddingBottom: 14,
            }
        })
    },
    title: {
        color: 'white',
        fontSize: 24,
        backgroundColor: 'transparent'
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default styles;