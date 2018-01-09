import React from 'react';
import {List, InputItem, WhiteSpace, Button,WingBlank} from 'antd-mobile';
import {View, Image, ListView, ActivityIndicator, Text} from 'react-native';
import {createForm} from 'rc-form';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from './utils/getScreenSize';
import {getVerifyCode,YXIP,loginURL} from './Constant';
import {object2console} from './utils/object2console';
import {json2params} from './utils/json2params';

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
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);
        this.changePhone= this.changePhone.bind(this);
        this.changePWD= this.changePWD.bind(this);
        this.changeVCode= this.changeVCode.bind(this);

        this.state=({
            user:{phone:'',password:'',inputVerifyCode:''}
        })
    }

    changePhone(value){
        this.setState({
            id:value
        })
    }

    changePWD(value){
        this.setState({
            password:value
        })
    }

    changeVCode(value){
        this.setState({
            inputVerifyCode:value
        })
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

        object2console(myInit.body);

        fetch(YXIP+loginURL, myInit)
            .then((response) => {
                if (response.status !== 200){
                    console.error(loginURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else{
                    response.json().then((responseObj)=>{
                        if(responseObj.state === 'fail')
                            this.setState({fail:responseObj['msg']})

                    }) .catch((err) => console.error(err));

                }

            })
            .catch((err) => console.error(err))
    }

    componentDidMount(){

    }

    render() {

        const {getFieldProps} =this.props.form

        return(
               <WingBlank>
                   <List style={{flex:1,justifyContent:'flex-start',width:SCREENWIDTH}}>
                       <Item>
                           <InputItem
                               {...getFieldProps('phone')}
                               type="phone"
                               maxLength={13}
                               placeholder="请输入手机号"
                               onChange={this.changePhone}
                               value={this.state.id}
                           >
                               <Text>手机号</Text>
                           </InputItem>
                       </Item>
                       <WhiteSpace></WhiteSpace>
                       <Item>
                           <InputItem
                               placeholder="请输入密码"
                               type="password"
                               onChange={this.changePWD}
                               value={this.state.password}
                           >
                               <Text>密码</Text>
                           </InputItem>
                       </Item>
                       <WhiteSpace></WhiteSpace>
                       <Item
                           thumb={
                       <View style={{flex:1}}>
                        <InputItem
                               placeholder="验证码"
                               onChange={this.changeVCode}
                               value={this.state.inputVerifyCode}
                           >
                           <Text>验证码</Text>
                           </InputItem>
                        </View>
                    }
                       extra={
                        <Image style={{height: 20, width: 60, marginRight: 5}}
                                  source={{uri:YXIP+getVerifyCode}}
                           ></Image>
                       }>

                       </Item>
                       <WhiteSpace></WhiteSpace>
                       <Item>
                           <WingBlank><Button type="warning" onClick={this.submit}>登录</Button></WingBlank>
                       </Item>
                       <View style={{flex:1}}><Text>{this.state.fail?this.state.fail:''}</Text></View>
                   </List>
               </WingBlank>

        )
    }
}

const LoginWrapper = createForm()(Login)
export default LoginWrapper;