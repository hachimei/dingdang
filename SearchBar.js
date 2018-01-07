import React from 'react';
import {SearchBar,WingBlank,WhiteSpace,View} from 'antd-mobile';

export default class Search extends React.Component{

    render(){
        return(
            <View>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <SearchBar placeholder="Search" maxLength={8} />
            </View>
        )
    }
}