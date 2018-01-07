<form>
    <List
        renderHeader={() => 'Form Validation'}
        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
    >
        <InputItem
            {...getFieldProps('account', {
                // initialValue: 'little ant',
                rules: [
                    { required: true, message: 'Please input account' },
                    { validator: this.validateAccount },
                ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
                alert(getFieldError('account').join('、'));
            }}
            placeholder="please input account"
        >Account</InputItem>
        <InputItem {...getFieldProps('password')} placeholder="please input password" type="password">
            Password
        </InputItem>
        <Item
            extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
        >Confirm Infomation</Item>
        <Item><div style={{ padding: 7 }}><Range defaultValue={[20, 80]} /></div></Item>
        <Item extra={<Stepper style={{ width: '100%', minWidth: '100px' }} showNumber size="small" defaultValue={20} />}>Number of Subscribers</Item>
        <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
        </Item>
    </List>
</form>
<ScrollView>
                <Flex style={{height: SCREENHEIGHT}}>
                    <Tabs tabs={tabs} initialPage={4} tabBarPosition="bottom" renderTab={renderTab}
                          style={{backgroundColor: '#fff'}}>
                        <Flex direction="column" style={{height: SCREENHEIGHT}}>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            <SearchBar/>
                            <WhiteSpace size="lg"/>

                            <View><Text>Content of first tab</Text></View>

                        </Flex>
                        <Flex direction="column" style={{height: SCREENHEIGHT}}>
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
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
                            <ViewUserPersonalData></ViewUserPersonalData>
                        </Flex>
                    </Tabs>
                </Flex>
            </ScrollView>
