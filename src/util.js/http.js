import axios from 'axios'
import qs from 'qs'


// axios.defaults.timeout = 15000;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
  });

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
  
    return response;
  }, function (error) {
    // 对响应错误做点什么

    return Promise.reject(error);
  });



const fetch = (method,url,data,sum)=>{
    let obj;
    if(sum){
        obj = {
            method: method,
            url: url,
            data: data,
            params: data
        }
    } else{
        obj = {
                method: method,
                url: url,
                data: qs.stringify(data),
                params: qs.stringify(data)
            }
    }

   

    if(!data){
        delete obj.data;
        delete obj.params;
    } else if(method === 'get'){
        delete obj.data
    } else {
        delete obj.params
    }
    
    return new Promise( (resolve,reject)=>{
        axios(obj)
        .then( res =>{
            if(res.status === 200 && res.statusText === "OK"){
                resolve(res)
            }
        })
        .catch( err =>{
            reject(err)
        })
    })
}

export {
    fetch
}