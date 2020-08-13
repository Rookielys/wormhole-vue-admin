<template>
    <div class="login-background">
        <Card class="login-card animate__animated animate__zoomIn animate__faster" shadow>
            <div class="login-header">
                用户登录
            </div>
            <div class="input-item">
                <Input v-model="loginParam.username" placeholder="请输入登录用户名"
                       clearable size="large" prefix="ios-person-outline"/>
            </div>
            <div class="input-item">
                <Input v-model="loginParam.pwd" placeholder="请输入登录密码" type="password"
                       clearable size="large" password prefix="ios-lock-outline"/>
            </div>
            <div class="input-item">
                <div class="verify-input">
                    <Input v-model="loginParam.verifyCode" clearable placeholder="验证码"
                           prefix="ios-key-outline" size="large" @keyup.native.enter="clickLoginBtn"/>
                </div>
                <div class="verify-img">
                    <img :src="verificationCode" alt="加载失败"
                         style="border: 1px solid rgb(220, 222, 226); cursor: pointer;"
                         @click="refreshVerificationCode">
                </div>
            </div>
            <div class="input-item flex-container">
                <Checkbox v-model="loginParam.rememberMe">记住我</Checkbox>
                <!--<a>找回密码</a>-->
            </div>
            <div class="input-item">
                <Button type="primary" size="large" long @click="clickLoginBtn" :loading="loginLoading">登录</Button>
            </div>
            <div class="input-item" style="text-align: center; margin-bottom: 0;">
                <Button icon="logo-github" to="https://github.com/Rookielys/wormhole-vue-admin" target="_blank"></Button>
            </div>
        </Card>
    </div>
</template>

<script>
    import qs from 'qs'
    import {mapMutations} from 'vuex'
    import {SET_TOKEN} from '@/stores/modules/authc.js'

    export default {
        name: "login",
        data() {
            return {
                loginParam: {
                    username: null,
                    pwd: null,
                    verifyCode: null,
                    rememberMe: false
                },
                key: null,
                verificationCode: null,
                loginLoading: false
            };
        },
        created() {
            this.refreshVerificationCode();
        },
        methods: {
            ...mapMutations('authc', {
                'setToken': SET_TOKEN
            }),
            refreshVerificationCode() {
                this.$requestProxy.verificationCode().then(data => {
                    if (data.status) {
                        this.verificationCode = data.data.text;
                        this.key = data.data.key;
                    }
                });
            },
            clickLoginBtn() {
                let letgo = this.validateLogin();
                if (letgo) {
                    this.loginParam.key = this.key;
                    this.loginLoading = true;
                    this.$requestProxy.login(qs.stringify(this.loginParam), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(data => {
                        if (data.status) {
                            //console.log(data.message);
                            // 将token放入vuex
                            this.setToken(data.data);
                            this.$router.push({name: "home"});
                        } else {
                            this.refreshVerificationCode();
                        }
                    }).then(() => {
                        this.loginLoading = false;
                    });
                }
            },
            validateLogin() {
                if (!this.loginParam.username) {
                    this.$Message.error("用户名不能为空")
                    return false;
                } else if (!this.loginParam.pwd) {
                    this.$Message.error("密码不能为空")
                    return false;
                } else if (!this.loginParam.verifyCode) {
                    this.$Message.error("验证码不能为空")
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-background {
        height: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        // 背景模糊，使用伪类不会影响子元素，否则子元素也会模糊
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-image: url("../assets/login.jpg");
            // 不让背景滚动
            background-attachment: fixed;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-origin: border-box;
            background-clip: border-box;
            background-position: left top;
            filter: blur(1px);
            -webkit-filter: blur(1px);
            overflow: hidden;
        }

        .login-card {
            width: 380px;
            height: 457px;
            $padding-top: 25px;

            /deep/ .ivu-card-body {
                padding: $padding-top 30px;
            }

            .login-header {
                height: 80px;
                line-height: 80px;
                font-size: 1.5em;
                text-align: center;
                margin-top: -$padding-top;
            }

            .input-item {
                margin-bottom: 25px;

                .verify-input {
                    width: 200px;
                    display: inline-block;
                    margin-right: 18px;
                    vertical-align: top;
                }

                .verify-img {
                    display: inline-block;
                    height: 40px;
                    width: 100px;
                    //border: 1px solid rgb(220, 222, 226);
                    vertical-align: top;
                    //border-radius: 4px;
                }
            }

            .flex-container {
                display: flex;
                justify-content: space-between;
            }
        }
        .ivu-btn {
            border: none;
            &:hover {
                color: #515a6e;
            }
            &:focus {
                box-shadow: none;
            }
            /deep/ i {
                font-size: 2em;
            }
        }
    }
</style>