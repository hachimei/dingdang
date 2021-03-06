import React from 'react';
import {View} from 'react-native';
import {Drawer,List} from 'antd-mobile';
import {height as SCREENHEIGHT, width as SCREENWIDTH} from "./utils/getScreenSize";

export default class MyDrawer extends React.Component{
    constructor(props){
        super(props);

        this.props.onOpenChange = this.props.onOpenChange.bind(this)

        this.state = {
            open: true,
        }
    }


    render(){
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                                       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                                       multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                                   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);
        return(
            <Drawer
                className="my-drawer"
                style={{ width:SCREENWIDTH,height: SCREENHEIGHT*0.5 }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
                Click upper-left corner
            </Drawer>
        )
    }
}
