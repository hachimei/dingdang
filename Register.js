import React from 'react';
import {View, Text,Image,TouchableHighlight } from 'react-native';
import {NavBar, Icon, Flex, List, Button,WingBlank,InputItem,WhiteSpace} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";
import NavHeader from './NavHeader';
import { createForm } from 'rc-form';

const Item = List.Item;

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state={
            nextStatus:true
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Flex direction="column" justify="start" align="center"
                  style={{height: SCREENHEIGHT * 0.95, width: SCREENWIDTH}}
            >
            <NavHeader title="注册" leftImageUrl={require('./assets/back.png')}></NavHeader>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <InputItem
                {...getFieldProps('phone')} maxLength={13}
                style={{width:SCREENWIDTH*0.8}} type="phone" placeholder="请输入手机号码">
                <Image style={{height:22,width:22}}
                    source={require('./assets/userAccount.png')}></Image>
            </InputItem>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <Button style={{width:SCREENWIDTH*0.8}}
                    onClick={()=>{}}
                    disabled={this.state.nextStatus}>下一步</Button>
            </Flex>

        )
    }
}

const RegisterWrapper = createForm()(Register);
export default RegisterWrapper;