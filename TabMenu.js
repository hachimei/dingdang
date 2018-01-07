import React from 'react';
import {View,Text,Image} from 'react-native';
import {Tabs} from 'antd-mobile';

const tabs = [
    {title: '首页', sub: '1'},
    {title: '分类', sub: '2'},
    {title: '购物车', sub: '3'},
    {title: '我的足迹', sub: '4'},
    {title: '我的订单', sub: '5'},
]




export default TabMenu = ()=>(
    <View style={{height:750}}>
        <Tabs tabs={tabs} initialPage={1} tabBarPosition="bottom" >
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 750, backgroundColor: '#fff' }}>
                <Text>Content of first tab</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 750, backgroundColor: '#fff' }}>
                <Text>Content of second tab</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 750, backgroundColor: '#fff' }}>
                <Text>Content of third tab</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 750, backgroundColor: '#fff' }}>
                <Text>Content of fourth tab</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 750, backgroundColor: '#fff' }}>
                <Text>Content of fifth tab</Text>
            </View>
        </Tabs>
    </View>
)