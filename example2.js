import React from 'react';
import {Flex, WhiteSpace} from 'antd-mobile';
import {View, Text, StyleSheet} from 'react-native';

const PlaceHolder = ({style='',...restProps}) => (
    <View><Text style={[style,styles.placeholder]} {...restProps}>Block</Text></View>
);


export default class FlexExample extends React.Component {

    render() {
        return (<View style={styles.flexContainer}>
            <Text style={styles.subTitle}>Basic</Text>
            <Flex>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
            </Flex>
            <WhiteSpace size="lg"/>
            <Flex>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
            </Flex>
            <WhiteSpace size="lg"/>
            <Flex>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
                <Flex.Item><PlaceHolder style={styles.placeholder}/></Flex.Item>
            </Flex>
            <WhiteSpace size="lg"/>

            <Text style={styles.subTitle}>Wrap</Text>
            <Flex wrap="wrap">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <WhiteSpace size="lg" />

            <Text style={styles.subTitle}>Align</Text>
            <Flex justify="center">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <Flex direction="row" justify="end" align="start">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <Flex justify="between">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <Flex align="center">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={[styles.inline,styles.small]}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <Flex align="end">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={[styles.inline,styles.small]}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
            <Flex align="baseline">
                <PlaceHolder style={styles.inline}/>
                <PlaceHolder style={[styles.inline,styles.small]}/>
                <PlaceHolder style={styles.inline}/>
            </Flex>
        </View>)
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        marginLeft: 35,
        marginRight:35,
        marginTop: 0,
        marginBottom: 0
    },
    inline: {
        width: 100,
        margin: 9,
        marginLeft: 0
    },
    small: {
        height: 20,
        lineHeight: 20
    },
    subTitle: {
        color: '#888',
        fontSize: 14,
        paddingTop: 30,
        paddingRight: 0,
        paddingBottom: 18,
        paddingLeft: 0
    },
    placeholder: {
        backgroundColor: '#bbb',
        height: 60,
        lineHeight: 60,
        textAlign: 'center',
    }
})
