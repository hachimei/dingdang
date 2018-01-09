/**
 * Created by hasaki on 2018/1/8.
 */
export function json2params(obj){//obj是一个对象
    let paramStr;
    for(key of Object.keys(obj)){
        if(!paramStr)
            paramStr= `${key}=${obj[key]}&`;
        else
            paramStr += `${key}=${obj[key]}&`;
    }
    
    console.log(paramStr);
    return paramStr;
}