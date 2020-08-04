import RequestInfo from '@/apis/modules/RequestInfo.js'

export default [
    new RequestInfo('verificationCode', '/verificationCode', 'get'),
    new RequestInfo('login', '/login', 'post')
]