import React from 'react';
import { List, Checkbox, Flex } from 'antd-mobile';
import {View} from 'react-native';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

export default class Test extends React.Component {
    onChange = (val) => {
        console.log(val);
    }
    render() {
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];
        return (<View>
            <List renderHeader={() => 'CheckboxItem demo'}>
                {data.map(i => (
                    <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                        {i.label}
                    </CheckboxItem>
                ))}
                <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
                    Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
                </CheckboxItem>
            </List>

            <Flex>
                <Flex.Item>
                    <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                         Agree三金！！！
                        {/*<a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>agreement</a>*/}
                    </AgreeItem>
                </Flex.Item>
            </Flex>
        </View>);
    }
}

