import {Message} from "element-ui"

// default 本身是一个nuxt对象 从对象中解构$axios出来
export default ({$axios},)=>{
    // 监听axios请求的错误
    $axios.onError(result=>{
        // 从result.respons.data中解构出错误信息
        const {message,statusCode} =result.response.data;
        // 如果参数错误给出提示信息
        if(statusCode === 400){
            // 调用第三方包的Message模块
            Message.warning(message)
        }
    })
}