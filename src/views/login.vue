<template>
    <div class="login-background">
        <el-card class="login-card animate__animated animate__zoomIn animate__faster">
            <div class="login-header">
                用户登录
            </div>
            <div class="input-item">
                <el-input v-model="loginParam.username" placeholder="请输入用户名"
                          clearable size="large">
                    <svg-icon icon-class="user" slot="prefix"></svg-icon>
                </el-input>
            </div>
            <div class="input-item">
                <el-input v-model="loginParam.pwd" placeholder="请输入密码" type="password"
                          clearable size="large" password>
                    <svg-icon icon-class="lock" slot="prefix"></svg-icon>
                </el-input>
            </div>
            <div class="input-item">
                <div class="verify-input">
                    <el-input v-model="loginParam.verifyCode" clearable placeholder="验证码"
                              size="large" @keyup.native.enter="clickLoginBtn">
                        <svg-icon icon-class="safety-certificate" slot="prefix"></svg-icon>
                    </el-input>
                </div>
                <div class="verify-img">
                    <img :src="verificationCode" alt="加载失败"
                         style="border: 1px solid rgb(220, 222, 226); cursor: pointer;"
                         @click="refreshVerificationCode">
                </div>
            </div>
            <div class="input-item flex-container">
                <el-checkbox v-model="loginParam.rememberMe">记住我</el-checkbox>
                <!--<a>找回密码</a>-->
            </div>
            <div class="input-item">
                <el-button type="primary" size="large" @click="clickLoginBtn" :loading="loginLoading"
                           style="width: 100%;">登录
                </el-button>
            </div>
            <div class="input-item" style="text-align: center; margin-bottom: 0;">
                <el-link :underline="false" href="https://github.com/Rookielys/wormhole-vue-admin" target="_blank">
                    <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16"
                         version="1.1" width="32" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </el-link>
            </div>
        </el-card>
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
                    this.$message.error("用户名不能为空")
                    return false;
                } else if (!this.loginParam.pwd) {
                    this.$message.error("密码不能为空")
                    return false;
                } else if (!this.loginParam.verifyCode) {
                    this.$message.error("验证码不能为空")
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
            height: 440px;
            $padding-top: 25px;
            border: 0;

            /deep/ .el-card__body {
                padding: 20px 30px;
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

                /deep/ .el-input__prefix {
                    display: flex;
                    align-items: center;
                }

                .verify-input {
                    width: 200px;
                    display: inline-block;
                    margin-right: 20px;
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
    }
</style>