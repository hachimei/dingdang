import React from 'react';
import {TouchableHighlight,View,Text,Image} from 'react-native';
import { Icon, Flex,WingBlank} from 'antd-mobile';
import {width as SCREENWIDTH} from "./utils/getScreenSize";

export default class NavHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Flex direction="row" justify="space-between" align="start"
                  style={{borderBottomColor: '#EDEDED', borderBottomWidth: 2, width: SCREENWIDTH}}>
                <TouchableHighlight onPress={()=>alert('www')}>
                    <Image style={{width: 15, height: 27,marginLeft:15}}
                           source={this.props.leftImageUrl} />
                </TouchableHighlight>
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingBottom: 9,
                        alignItems:"center",
                        marginLeft:-25
                    }}>{this.props.title}</Text>
                <Text></Text>
            </Flex>
        )
    }
}