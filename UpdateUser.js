import React from "react";
import { InputItem, Button, WingBlank, Radio, WhiteSpace, List } from 'antd-mobile';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { height as SCREENHEIGHT, width as SCREENWIDTH } from './utils/getScreenSize';
import { Camera, Permissions, ImagePicker } from 'expo';

const RadioItem = Radio.RadioItem;

class ReactScreen extends React.Component {
    static navigationOptions = {
        title: 'React'
    };

    render() {
        return <Text>Hello, React!</Text>;
    }
}

class CameraScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    static navigationOptions = ({ navigation }) => ({
        title: '拍照'
    });

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

class UpdateUserHeadPortraitScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    static navigationOptions = ({ navigation }) => ({
        title: '修改头像'
    });

    state = {
        image: null,
    };

    render() {
        const { navigate } = this.props.navigation;
        let { image } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <WingBlank><Button
                    onClick={() => navigate('Camera')}
                >拍照</Button></WingBlank>
                <WingBlank><Button
                    onClick={this._pickImage}
                >从本地图库选择</Button></WingBlank>
                {image &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>}
            </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };
}

class UpdateUserNicknameScreen extends React.Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;

        this.change = this.change.bind(this);

        this.state = {
            inputItemValue: params.nickname
        }

    }

    static navigationOptions = ({ navigation }) => ({
        title: '修改昵称'
    });

    change(value) {

        this.setState({
            inputItemValue: value
        })
    }

    render() {

        return (<View style={{ flex: 1 }}>
            <WingBlank><InputItem value={this.state.inputItemValue} onChange={this.change}/></WingBlank>
            <WingBlank><Button type="warning">保存</Button></WingBlank>
        </View>);
    }
}


class UpdateUserGenderScreen extends React.Component {
    constructor(props) {
        console.log('UpdateUser的props:' + props.onChange);
        super(props);

        const { params } = this.props.navigation.state;

        console.log('params.gender:' + params.gender);

        this.change = this.change.bind(this);

        this.state = {
            gender: params.gender
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: '修改性别'
    });

    change(gender) {
        this.setState({
            gender: gender
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (<View style={{ flex: 1 }}>
            <WingBlank>
                <RadioItem key={1} checked={1 === this.state.gender}
                           onChange={() => params.onChange(1, this.change(1))}>男</RadioItem>
                <RadioItem key={0} checked={0 === this.state.gender}
                           onChange={() => params.onChange(0, this.change(0))}>女</RadioItem>
            </WingBlank>
            <WhiteSpace size="lg"/>
            <WingBlank><Button type="warning">保存</Button></WingBlank>
        </View>);
    }
}

export { UpdateUserHeadPortraitScreen, UpdateUserNicknameScreen, CameraScreen, UpdateUserGenderScreen };