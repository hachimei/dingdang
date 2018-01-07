import React from 'react';
import {List,View} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";

const Item = List.Item;

export default class Me extends React.Component{

    render(){
        return(
            <List style={{width: SCREENWIDTH, height: SCREENHEIGHT}}>
                <Item>hachimei</Item>
                <Item>钱包</Item>
                <Item>收藏</Item>
            </List>
        )
    }
}