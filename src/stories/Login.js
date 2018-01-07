import React from 'react';
import {List, InputItem, Switch, Stepper, Range, Button} from 'antd-mobile';
import {View, Image, ListView, ActivityIndicator, Text} from 'react-native';
import {createForm} from 'rc-form';

const Item = List.Item;

class Login extends React.Component {

    /*
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
     */

    render() {
        return(
            <View style={{flex:1}}>
                <List renderHeader={() => '登录'}>
                    <InputItem
                        placeholder="请输入用户名"
                    >
                        <Text>用户名</Text>
                    </InputItem>
                    <InputItem
                        placeholder="请输入密码"
                        type="password"
                    >
                        <Text>密码</Text>
                    </InputItem>
                </List>
            </View>

        )
    }
}

const LoginWrapper = createForm()(Login)
export default LoginWrapper;