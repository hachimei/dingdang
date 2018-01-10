import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import { WhiteSpace,Button, Tabs, Flex, SearchBar, Card,NavBar,Icon} from 'antd-mobile';
// import Test from './example1';
import Test from './example2';
// import SearchBar from './SearchBar';
// import TapMenu from './TabMenu';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from './utils/getScreenSize';
import Login from './Login';
import Me from './Me';
import Register from './Register';
import LoginAndRegisterScreen from './LoginAndRegister';
import ViewUserPersonalData from './ViewUserPersonalData';
import {UpdateUserNicknameScreen,CameraScreen,UpdateUserGenderScreen,UpdateUserHeadPortraitScreen
    ,UpdateUserQQScreen,UpdateUserIntroductionScreen,UpdateUserWechatScreen,UpdateUserEmailScreen} from './UpdateUser';
import { StackNavigator } from 'react-navigation';
import {LRTabs} from './Constant';
import {object2console} from './utils/object2console';
import ViewUserPersonalDataScreen from './ViewUserPersonalData';

const tabs = [
    {title: '首页', sub: '1', src: require('./assets/home.png')},
    {title: '分类', sub: '2', src: require('./assets/classification.png')},
    {title: '购物车', sub: '3', src: require('./assets/cart.png')},
    {title: '我的足迹', sub: '4', src: require('./assets/myHistory.png')},
    {title: '我的订单', sub: '5', src: require('./assets/myOrder.png')},
];

const renderTab = (tab) => {
    return (
        <Image source={tab.src} style={{width: 30, height: 35}}></Image>

    )
};

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.getPhone = this.getPhone.bind(this);

        this.state = ({
            phone: ''
        })
    }

    static navigationOptions = {
        title: '叮当书城'
    };

    getPhone(value) {
        this.setState({
            phone: value
        });
    }

    render() {
        const { navigation } = this.props;

        return (
            <ScrollView>
                <Flex style={{height: SCREENHEIGHT*0.938}}>
                    <Tabs tabs={tabs} initialPage={4} tabBarPosition="bottom" renderTab={renderTab}
                          style={{backgroundColor: '#fff'}}>
                        <Flex direction="column" style={{height: SCREENHEIGHT}}>
                            <SearchBar/>
                            <WhiteSpace size="lg"/>

                            <View><Text>Content of first tab</Text></View>

                        </Flex>
                        <Flex direction="column" style={{height: SCREENHEIGHT}}>
                            <SearchBar/>
                            <View><Text>Content of second tab</Text></View>
                        </Flex>
                        <Flex direction="column" justify="center" align="center" style={{height: SCREENHEIGHT}}>
                            <Text>Content of third tab</Text>

                        </Flex>
                        <Flex direction="column" justify="center" align="center" style={{height: SCREENHEIGHT}}>
                            <Text>Content of fourth tab</Text>
                        </Flex>
                        <Flex direction="column" justify="center" align="center"
                              style={{height: SCREENHEIGHT, width: SCREENWIDTH}}
                        >
                            <Button
                                onClick={()=>navigation.navigate('LoginAndRegister',{getPhone:this.getPhone})}>登录/注册</Button>
                            <Button onClick={()=>navigation.navigate('ViewUserPersonalData',{phone:this.state.phone})}>完善个人资料</Button>
                        </Flex>
                    </Tabs>
                </Flex>
            </ScrollView>
        )
    }
}
class ReactScreen extends React.Component {
    static navigationOptions = {
        title: 'React'
    };

    render() {
        return <Text>Hello, React!</Text>;
    }
}

const DingDangApp = StackNavigator({
    Home: {screen: HomeScreen},
    UpdateUserNickname: {screen: UpdateUserNicknameScreen},
    UpdateUserGender: {screen: UpdateUserGenderScreen},
    UpdateUserHeadPortrait: {screen: UpdateUserHeadPortraitScreen},
    Camera: {screen: CameraScreen},
    UpdateUserQQ: {screen: UpdateUserQQScreen},
    UpdateUserIntroduction: {screen: UpdateUserIntroductionScreen},
    UpdateUserWechat: {screen: UpdateUserWechatScreen},
    UpdateUserEmail: {screen: UpdateUserEmailScreen},
    LoginAndRegister: {screen: LoginAndRegisterScreen},
    ViewUserPersonalData: {screen: ViewUserPersonalDataScreen}
});

/*
 <View style={styles.container}>
 <Text>hello,Exdeiidpo!!</Text>
 <Button type="primary">Learn more</Button>
 <Button loading>loading</Button>

 </View>
 <Image style={{width: 50, height: 50}} source={{uri:tabs.src}}/>
 */


export default class App extends React.Component {
    onChange = (val) => {
        console.log(val);
    }

    render() {

        return (
            <DingDangApp />
        );
    }
}


