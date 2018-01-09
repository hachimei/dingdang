import React from 'react';
import {Image,View,Text} from 'react-native';
import { WingBlank,List , Button,InputItem,WhiteSpace} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";
import { createForm } from 'rc-form';
import {json2params} from './utils/json2params';
import {registerUserURL} from './Constant';

const Item = List.Item;

class Register extends React.Component {
    constructor(props){
        super(props);

        this.change = this.change.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.submit = this.submit.bind(this);

        this.state={
            sendStatus:true,
            nextStatus:true
        }
    }

    change(phone){
        if(phone.length === 13){
            this.setState({
                sendStatus:false,
                phone:phone
            });
        }
        else{
            this.setState({
                sendStatus:true,
                phone:phone
            });
        }

    }

    changeCode(code){
        if(code.length === 4){
            this.setState({
                nextStatus:false,
                code:code
            });
        }
        else{
            this.setState({
                nextStatus:true,
                code:code
            });
        }

    }

    submit(){
        let myInit = {
            method: 'POST',
            mode: 'cors',
            headers: {

                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

            },
            cache: 'default',
            body:json2params(this.state)
        };
        fetch(registerUserURL, myInit)
            .then((response) => {
                if (response.status !== 200){
                    console.error(registerUserURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else
                    alert('注册成功！')
            })
            .catch((err) => console.error(err))
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <WingBlank>
                <List style={{flex:1,justifyContent:'flex-start',width:SCREENWIDTH}}>
                    <Item>
                        <InputItem
                            {...getFieldProps('phone')}
                            type="phone"
                            maxLength={13}
                            placeholder="请输入手机号"
                            onChange={this.change}
                            value={this.state.phone}
                        >
                            <Text>手机号</Text>
                        </InputItem>
                    </Item>
                    <WhiteSpace></WhiteSpace>
                    <Item
                        thumb={
                       <View style={{width:SCREENWIDTH*0.4}}>
                        <InputItem
                               {...getFieldProps('number')}
                               type="number"
                               maxLength={6}
                               placeholder="手机验证码"
                               onChange={this.changeCode}
                               value={this.state.code}
                           >
                           </InputItem>
                        </View>
                    }
                        extra={
                       <Button type="primary" disabled={this.state.sendStatus}>发送验证码</Button>
                       }>

                    </Item>
                    <WhiteSpace></WhiteSpace>
                    <Item>
                        <WingBlank><Button type="warning" onClick={this.submit}
                        disabled={this.state.nextStatus}>下一步</Button></WingBlank>
                    </Item>
                </List>
            </WingBlank>
        )
    }
}

const RegisterWrapper = createForm()(Register);
export default RegisterWrapper;