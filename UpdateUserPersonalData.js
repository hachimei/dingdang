import React from 'react';
import {Image,View,ActivityIndicator} from 'react-native';
import {List, InputItem, WhiteSpace} from 'antd-mobile';
import {createForm} from 'rc-form';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";
import ChooseHeadPortrait from './ChooseHeadPortrait';
import MyDrawer from './MyDrawer';

const Item = List.Item;

class UserPersonalData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        console.log('进入异步');
        return fetch('http://172.17.4.99:8080/dingdang/getUser?id=1')
            .then((response)=>{
                if(response.status !== 200){
                    throw new Error ('连接服务器失败,错误码：'+response.status);
                }
                response.json().then((responseJson)=>{
                    console.log('ww'+responseJson)
                    this.setState({
                        isLoading:false,
                        user:responseJson
                    }).catch((err)=>{
                        this.setState({user:{qq:1}})
                    });
                }).catch((err)=>{
                    this.setState({user:{qq:2}})
                });
            })
    }

    render(){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        };

        const user = this.state.user;

        return(
            <View>
                <List renderHeader={() => '完善用户信息'} style={{width:SCREENWIDTH*0.9}}>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra='显示用户当前头像，暂时留空'
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/headPortrait.png')}
                          ></Image>}>
                        头像</Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.nickname}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/nickname.png')}
                          ></Image>}
                    >
                        昵称
                    </Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.gender_zw}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/gender.png')}
                          ></Image>}
                    >
                        性别
                    </Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.introduction}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/selfIntroduction.png')}
                          ></Image>}
                    >
                        个人介绍
                    </Item>
                </List>
                <List style={{width:SCREENWIDTH*0.9}}>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.qq}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/qq.png')}
                          ></Image>}
                    >
                        QQ
                    </Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.wechat}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/wechat.png')}
                          ></Image>}
                    >
                        微信
                    </Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra={user.email}
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/mail.png')}
                          ></Image>}
                    >
                        邮箱
                    </Item>
                    <Item arrow="horizontal" onClick={()=>{}}
                          extra='有时间再来做'
                          thumb={<Image style={{height:20,width:20,marginRight:5}}
                                        source={require('./assets/selfIntroduction.png')}
                          ></Image>}
                    >
                        主页显示联系方式
                    </Item>
                </List>
            </View>
        )
    }
}

const UserPersonalDataWrapper = createForm()(UserPersonalData);
export default UserPersonalData;