/**
 * Created by hasaki on 2018/1/9.
 */
import React from 'react';
import {LRTabs} from './Constant';
import Register from './Register';
import Login from './Login';
import {Tabs, Flex} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from './utils/getScreenSize';

export default class LoginAndRegister extends React.Component {
    constructor(props) {
        super(props);


    }

    static navigationOptions = ({ navigation }) => ({
        title: '登录/注册'
    });

    render() {

        return  <Tabs tabs={LRTabs} initialPage={0} tabBarPosition="top">
            <Flex direction="column" style={{height: SCREENHEIGHT*0.7}}>
                <Login></Login>
            </Flex>
            <Flex direction="column" style={{height: SCREENHEIGHT*0.7}}>
                <Register></Register>
            </Flex>
        </Tabs>
    }
}