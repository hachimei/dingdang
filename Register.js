import React from 'react';
import {Image,View,Text} from 'react-native';
import { WingBlank,List , Button,InputItem,WhiteSpace,Toast} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";
import { createForm } from 'rc-form';
import {json2params} from './utils/json2params';
import {object2console} from './utils/object2console';
import {YXIP as ip, getUserByIdURL, registerUserURL,updateUserURL,sendCodeURL,verifyCodeURL} from './Constant';

const Item = List.Item;
const regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}');

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.submit = this.submit.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.password2Change = this.password2Change.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.checkCode = this.checkCode.bind(this);

        this.state = {
            sendStatus: true,
            nextStatus: true,
            phoneError: false,
            passwordError: false,
            password2Error: false,

        }
    }


    sendCode() {
        this.setState({
            sendStatus: true,
        });
        let phone = this.state.phone.replace(/\s/g,'');
        console.log('code phone'+sendCodeURL +phone);
        fetch(ip+sendCodeURL +phone)
            .then((response) => {
                if (response.status !== 200) {
                    console.error(getUserByIdURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else {
                    response.json().then((responseObj)=> {
                            console.log(responseObj.msg+'   msg');
                            Toast.info(responseObj.msg)

                    });
                }
            })
            .catch((err) => console.error(err))

        setTimeout(()=> {
            this.setState({
                sendStatus: false
            });
        }, 60000)

    }

    onPasswordErrorClick = ()=> {
        if (this.state.passwordError) {
            Toast.info('密码中必须包含字母、数字、特称字符，至少8个字符，最多20个字符。');
        }
    }

    onPassword2ErrorClick = ()=> {
        if (this.state.password2Error) {
            Toast.info('密码中必须包含字母、数字、特称字符，至少8个字符，最多20个字符。');
        }
    }

    onPhoneErrorClick = () => {
        if (this.state.phoneError) {
            Toast.info('请输入有效的手机号');
        }
    }

    passwordChange(value) {
        if (regex.test(value)) {
            this.setState({
                passwordError: false,
            });
        } else {
            this.setState({
                passwordError: true,
            });
        }

        this.setState({
            password: value
        });
    }

    password2Change(value) {
        if (regex.test(value)) {
            this.setState({
                password2Error: false,
            });
        } else {
            this.setState({
                password2Error: true,
            });
        }

        this.setState({
            password2: value
        });
    }

    checkPhone(phone) {
        fetch(getUserByIdURL + phone)
            .then((response) => {
                if (response.status !== 200) {
                    console.error(getUserByIdURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else {
                    response.json().then((responseObj)=> {

                        if (responseObj.state) {
                            this.setState({
                                phoneError: false,
                                sendStatus: false
                            });

                        }
                        else {
                            this.setState({
                                phoneError: true,
                                sendStatus: true,
                                nextStatus: true
                            });
                            alert('该手机已注册！')
                        }
                    }).catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err))

    }

    checkCode(code){
        let phone = this.state.phone.replace(/\s/g,'');
        fetch(ip+verifyCodeURL + phone+'&code='+code)
            .then((response) => {
                if (response.status !== 200) {
                    console.error(verifyCodeURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else {
                    response.json().then((responseObj)=> {

                        if (responseObj.state == 'success') {
                            this.setState({
                                nextStatus: false
                            });
                        }
                        else {
                            this.setState({
                                nextStatus: true
                            });
                            Toast.info('手机验证码输入错误！')
                        }
                    }).catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err))
    }

    change(phone) {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
                phoneError: true,
                sendStatus: true
            });
        }
        if (phone.replace(/\s/g, '').length == 11)
            this.checkPhone(phone);
        this.setState({
            phone: phone
        });

    }

    changeCode(code) {
        if (code.length === 6) {

            this.checkCode(code);

            this.setState({
                code: code
            });
        }
        else {
            this.setState({
                nextStatus: true,
                code: code
            });
        }

    }

    submit() {

        if (!this.state.phone) {
            Toast.info('手机号不能为空')
            return;
        }
        if (this.state.phoneError) {
            if (this.state.phone.length < 13)
                Toast.info('手机号不足11位')
            else
                Toast.info('手机号已被注册')
            return;
        }
        if (this.state.passwordError) {
            Toast.info('密码不符合要求')
            return;
        }
        if (this.state.password2Error) {
            Toast.info('确认密码不符合要求')
            return;
        }
        if (!this.state.password) {
            Toast.info('密码不能为空')
            return;
        }
        if (!this.state.password2) {
            Toast.info('请确认密码')
            return;
        }
        if (this.state.password !== this.state.password2) {
            Toast.info('两次密码不一致');
            return;
        }
        if (!this.state.code) {
            Toast.info('验证码不能为空')
            return;
        }


        const {navigation}  = this.props;
        const getPhone = this.props.getPhone;

        this.setState({
            nextStatus: true
        })

        let myInit = {
            method: 'POST',
            mode: 'cors',
            headers: {

                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

            },
            cache: 'default',
            body: json2params(this.state)
        };

        fetch(registerUserURL, myInit)
            .then((response) => {
                if (response.status !== 200) {
                    console.error(registerUserURL + '失败，status:' + response.status);
                    alert('连接服务器失败');
                    this.setState({
                        nextStatus: false
                    })
                }
                else {
                    response.json().then((responseObj)=> {
                        if (responseObj.state === 'fail')
                            this.setState({fail: responseObj['msg'], nextStatus: false})
                        else {
                            getPhone(this.state.phone);
                            alert('注册成功！');
                            navigation.goBack(0)
                        }
                    }).catch((err) => console.error(err));

                }

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
                            clear={true}
                            maxLength={13}
                            placeholder="请输入手机号"
                            onChange={this.change}
                            value={this.state.phone}
                            error={this.state.phoneError}
                            onErrorClick={this.onPhoneErrorClick}
                        >
                            <Text>手机号</Text>
                        </InputItem>
                    </Item>
                    <Item>
                        <InputItem
                            {...getFieldProps('password')}
                            type="password"
                            clear={true}
                            placeholder="请输入密码"
                            onChange={this.passwordChange}
                            value={this.state.password}
                            error={this.state.passwordError}
                            onErrorClick={this.onPasswordErrorClick}
                        >
                            <Text>密码</Text>
                        </InputItem>
                    </Item>
                    <Item>
                        <InputItem
                            {...getFieldProps('password')}
                            type="password"
                            clear={true}
                            placeholder="请再次输入密码"
                            onChange={this.password2Change}
                            value={this.state.password2}
                            error={this.state.password2Error}
                            onErrorClick={this.onPassword2ErrorClick}
                        >
                            <Text>确认密码</Text>
                        </InputItem>
                    </Item>
                    <WhiteSpace></WhiteSpace>
                    <Item
                        thumb={
                       <View style={{width:SCREENWIDTH*0.4}}>
                        <InputItem
                               {...getFieldProps('number')}
                               type="number"
                               clear={true}
                               maxLength={6}
                               placeholder="手机验证码"
                               onChange={this.changeCode}
                               value={this.state.code}
                           >
                           </InputItem>
                        </View>
                    }
                        extra={
                       <Button type="primary" disabled={this.state.sendStatus} onClick={this.sendCode}>
                       发送验证码
                       </Button>
                       }>

                    </Item>
                    <WhiteSpace></WhiteSpace>
                    <Item>
                        <WingBlank><Button type="warning" onClick={this.submit}
                                           disabled={this.state.nextStatus}>注册</Button></WingBlank>
                    </Item>
                    <Item>
                        <Text>{this.state.fail}</Text>
                    </Item>
                </List>
            </WingBlank>
        )
    }
}

const RegisterWrapper = createForm()(Register);
export default RegisterWrapper;