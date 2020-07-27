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
                           prefix="ios-key-outline" size="large"/>
                </div>
                <div class="verify-img">
                    ss
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginParam: {
                    username: null,
                    pwd: null,
                    verifyCode: null
                }
            };
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
                    border: 1px solid rgb(220, 222, 226);
                    vertical-align: top;
                    border-radius: 4px;
                }
            }
        }
    }
</style>