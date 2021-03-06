import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import {Message} from 'element-ui'
import store from "@/stores/index.js"

const request = axios.create({
    timeout: 5000,
    baseURL: '/sys',
    headers: {
        // 默认
        'Content-Type': 'application/json'
    }
    // 在传递给 then/catch 前，允许修改响应数据
    // 在过滤器之前执行
    /*
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
    }]*/
});

request.interceptors.request.use(config => {
    config.headers["Authorization"] = store.state.authc.token;
    return config;
}, error => {
    return Promise.reject(error)
});

request.interceptors.response.use(response => {
    // 调用then之前的处理
    if (!response.data.status) {
        Message.error({
            message: response.data.message,
            showClose: true
        });
    } else if (response.data.message) {
        Message.success({
            message: response.data.message,
            showClose: true
        });
    }
    return response.data;
}, error => {
    // 调用catch之前的处理
    // 弹出框可以在这统一处理？
    console.error(error);
    Message.error({
        message: error.message,
        showClose: true
    });
    return error.message;
})
// 响应数据转换-->拦截器-->自己的处理方法

let allRequests = [];
const loader = require.context('./modules', false, /.*Requests\.js$/);
_.forEach(loader.keys(), item => {
    // lodash没有添加的函数？
    allRequests = _.concat(allRequests, loader(item).default);
});

const requestProxy = {};
allRequests.forEach(item => {
    // conf是axios配置项中的配置，可选
    requestProxy[item.name] = (data, conf) => {
        let config = {
            method: item.type,
            url: item.url,
            ...conf
        };
        _.toLower(item.type) === 'post' ? config['data'] = data : config['params'] = data;
        return request(config);
    };
});

Vue.prototype.$requestProxy = requestProxy;

// test
/*
Vue.prototype.$requestProxy.login({lala: 'lal'}).then(r => {
    console.log(r)
}).catch(error => {
    console.log(error)
});*/