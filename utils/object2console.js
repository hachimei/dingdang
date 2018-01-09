/**
 * Created by hasaki on 2018/1/9.
 */
export function object2console(obj){
    for(let item of Object.keys(obj)){
        console.log(item);
    }
}