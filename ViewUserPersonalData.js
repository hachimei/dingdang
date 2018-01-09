import React from 'react';
import {Image, View, ActivityIndicator} from 'react-native';
import {List, InputItem, WhiteSpace, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";
import ChooseHeadPortrait from './ChooseHeadPortrait';
import {YXIP as ip, getUserByIdURL, registerUserURL,updateUserURL} from './Constant';
import {json2params} from './utils/json2params';
import {object2console} from './utils/object2console';

const Item = List.Item;

class UserPersonalData extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeHeadPortrait=this.onChangeHeadPortrait.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
        this.onChangeQQ = this.onChangeQQ.bind(this);
        this.onChangeWechat = this.onChangeWechat.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.submit = this.submit.bind(this);

        this.state = {
            isLoading: true
            
        }
    }

    componentDidMount(){
        fetch(getUserByIdURL)
            .then((response) => {
                if (response.status !== 200){
                    console.error(getUserByIdURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else{
                    response.json().then((responseJson)=>{
                        object2console(responseJson);
                        this.setState({
                            isLoading:false,
                            user:responseJson
                        })
                    });
                }
            })
            .catch((err) => console.error(err))
    }
    
    submit() {
        let myInit = {
            method: 'POST',
            mode: 'cors',
            headers: {

                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

            },
            cache: 'default',
            body:json2params(this.state.user)
        };
        fetch(updateUserURL, myInit)
            .then((response) => {
                if (response.status !== 200){
                    console.error(updateUserURL + '失败，status:' + response.status);
                    alert('连接服务器失败')
                }
                else
                    alert('保存成功！')
            })
            .catch((err) => console.error(err))
    }

    onChangeHeadPortrait(image){
        const {user} = this.state;
        console.log('修改当前用户的图片为');
        this.setState({
            user:{...user,icon:image},
            imageChange:true
        })
    }

    onChangeNickname(nickname){
        const {user} = this.state;
        console.log('修改当前用户的昵称为'+nickname);
        this.setState({
            user:{...user,nickname:nickname}
        })
    }

    onChangeGender(gender){
        const {user} = this.state;
        console.log('修改当前用户的性别为'+gender===1?'男':'女');
        this.setState({
            user:{...user,gender:gender,gender_zw:gender===1?'男':'女'}
        })
    }

    onChangeIntroduction(introduction){
        const {user} = this.state;
        console.log('修改当前用户的自我介绍为'+introduction);
        this.setState({
            user:{...user,introduction:introduction}
        })
    }

    onChangeQQ(qq){
        const {user} = this.state;
        console.log('修改当前用户的qq为'+qq);
        this.setState({
            user:{...user,qq:qq}
        })
    }

    onChangeWechat(wechat){
        const {user} = this.state;
        console.log('修改当前用户的wechat为'+wechat);
        this.setState({
            user:{...user,wechat:wechat}
        })
    }

    onChangeEmail(email){
        const {user} = this.state;
        console.log('修改当前用户的email为'+email);
        this.setState({
            user:{...user,email:email}
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        ;

        const {navigate} = this.props.navigation;
        const user = this.state.user;
        console.log(user);
        return (
            <View>
                <List renderHeader={() => '完善用户信息'} style={{width: SCREENWIDTH * 0.9}}>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserHeadPortrait', {onChange: this.onChangeHeadPortrait})
                    }
                          extra={<Image style={{height: 40, width: 40, marginRight: 5}}
                                        source={this.state.imageChange?{uri:user.icon}:{uri:ip+user.icon}}
                          ></Image>}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/headPortrait.png')}
                          ></Image>}>
                        头像</Item>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserNickname', {nickname: user.nickname,onChange:this.onChangeNickname})
                    }
                          extra={user.nickname}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/nickname.png')}
                          ></Image>}
                    >
                        昵称
                    </Item>
                    <Item arrow="horizontal" onClick={() => {
                        navigate('UpdateUserGender', {gender: user.gender,onChange:this.onChangGender})
                    }}
                          extra={user.gender_zw}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/gender.png')}
                          ></Image>}
                    >
                        性别
                    </Item>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserIntroduction', {introduction: user.introduction,onChange:this.onChangeIntroduction})
                    }
                          extra={user.introduction}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/selfIntroduction.png')}
                          ></Image>}
                    >
                        个人介绍
                    </Item>
                </List>
                <List style={{width: SCREENWIDTH * 0.9}}>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserQQ', {qq: user.qq,onChange:this.onChangeQQ})
                    }
                          extra={user.qq}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/qq.png')}
                          ></Image>}
                    >
                        QQ
                    </Item>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserWechat', {wechat: user.wechat,onChange:this.onChangeWechat})
                    }
                          extra={user.wechat}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/wechat.png')}
                          ></Image>}
                    >
                        微信
                    </Item>
                    <Item arrow="horizontal" onClick={() => navigate('UpdateUserEmail', {email: user.email,onChange:this.onChangeEmail})
                    }
                          extra={user.email}
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/mail.png')}
                          ></Image>}
                    >
                        邮箱
                    </Item>
                    <Item arrow="horizontal" onClick={() => {}
                    }
                          extra='有时间再来做'
                          thumb={<Image style={{height: 20, width: 20, marginRight: 5}}
                                        source={require('./assets/selfIntroduction.png')}
                          ></Image>}
                    >
                        主页显示联系方式
                    </Item>
                </List>
                <WhiteSpace size="lg"/>
                <Button type="warning" onClick={this.submit}>保存</Button>
            </View>
        )
    }
}

const UserPersonalDataWrapper = createForm()(UserPersonalData);
export default UserPersonalData;