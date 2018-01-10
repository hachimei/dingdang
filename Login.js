import React from 'react';
import {List, InputItem, WhiteSpace, Button,WingBlank,Toast } from 'antd-mobile';
import {View, Image, ListView, ActivityIndicator, Text,TouchableHighlight} from 'react-native';
import {createForm} from 'rc-form';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from './utils/getScreenSize';
import {getVerifyCode,YXIP,loginURL} from './Constant';
import {object2console} from './utils/object2console';
import {json2params} from './utils/json2params';
import { NavigationActions } from 'react-navigation'

const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}');
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
        this.vcodeFresh = this.vcodeFresh.bind(this);

        this.state=({
            id:'',
            password:'',
            inputVerifyCode:'',
            codeImage:YXIP+getVerifyCode,
            sbumitDisabled:true,
            phoneError:false,
            passwordError:false
        })
    }

    onPhoneErrorClick = () => {
        if (this.state.phoneError) {
            Toast.info('请输入有效的手机号');
        }
    }

    onPasswordErrorClick = ()=>{
        if (this.state.passwordError) {
            Toast.info('密码中必须包含字母、数字、特称字符，至少8个字符，最多20个字符。');
        }
    }


    vcodeFresh(){
        this.setState({
            codeImage:YXIP+getVerifyCode+'?time='+(new Date())
        });
    }

    changePhone(value){
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                phoneError: true,
                sbumitDisabled:true
            });
        } else {
            this.setState({
                phoneError: false,
                sbumitDisabled:false
            });
        }
        this.setState({
            id:value
        })
    }

    changePWD(value){
        if(regex.test(value)){
            this.setState({
                passwordError: false,
            });
        }else{
            this.setState({
                passwordError: true,
            });
        }
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

        if(!this.state.id){
            Toast.info('手机号不能为空')
            return;
        }
        if(this.state.passwordError){
            Toast.info('密码不符合要求')
            return;
        }
        if(!this.state.password){
            Toast.info('密码不能为空')
            return;
        }
        if(!this.state.inputVerifyCode){
            Toast.info('验证码不能为空')
            return;
        }

        const {navigation}=this.props;
        const getPhone  = this.props.getPhone;

        this.setState({
            sbumitDisabled:true
        })

        let myInit = {
            method: 'POST',
            mode: 'cors',
            headers: {

                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

            },
            cache: 'default',
            body:json2params(this.state)
        };



        fetch(YXIP+loginURL, myInit)
            .then((response) => {
                if (response.status !== 200){
                    console.error(loginURL + '失败，status:' + response.status);
                    alert('连接服务器失败');
                    this.setState({
                        sbumitDisabled:false
                    })
                }
                else{
                    response.json().then((responseObj)=>{
                        if(responseObj.state === 'fail')
                            this.setState({fail:responseObj['msg'],sbumitDisabled:false})
                        else{
                            getPhone(this.state.id);
                            navigation.goBack(0)
                        }
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
                               clear={true}
                               placeholder="请输入手机号"
                               onChange={this.changePhone}
                               value={this.state.id}
                               error={this.state.phoneError}
                               onErrorClick={this.onPhoneErrorClick}
                           >
                               <Text>手机号</Text>
                           </InputItem>
                       </Item>
                       <WhiteSpace></WhiteSpace>
                       <Item>
                           <InputItem
                               placeholder="请输入密码"
                               type="password"
                               clear={true}
                               maxLength={20}
                               onChange={this.changePWD}
                               value={this.state.password}
                               error={this.state.passwordError}
                               onErrorClick={this.onPasswordErrorClick}
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
                                maxLength={4}
                               onChange={this.changeVCode}
                               value={this.state.inputVerifyCode}
                           >
                           <Text>验证码</Text>
                           </InputItem>
                        </View>
                    }
                       extra={
                       <TouchableHighlight onPress={this.vcodeFresh}>
                        <Image style={{height: 20, width: 60, marginRight: 5}}
                                  source={{uri:this.state.codeImage}}
                           ></Image>
                       </TouchableHighlight>
                       }>

                       </Item>
                       <WhiteSpace></WhiteSpace>
                       <Item>
                           <WingBlank><Button type="warning" onClick={this.submit} disabled={this.state.sbumitDisabled}>登录</Button></WingBlank>
                       </Item>
                       <View style={{flex:1}}><Text>{this.state.fail?this.state.fail:''}</Text></View>
                   </List>
               </WingBlank>

        )
    }
}

const LoginWrapper = createForm()(Login)
export default LoginWrapper;