/**
 * Created by hasaki on 2018/1/9.
 */
import {YXIP} from '../Constant';

export function uploadImage(url){

        let formData = new FormData();
        formData.append('table','b_ddsc_user');
        formData.append('id','1');

        let file = {uri: url, type: 'application/octet-stream', name: 'headPortrait.jpg'};
        formData.append("file", file);
        fetch(YXIP + 'fileUpload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                console.log('uploadImage', responseData);
            })
            .catch((err)=> {
                console.log('err', '上传失败'+err);
            });

}
