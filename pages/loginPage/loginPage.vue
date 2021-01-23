<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" placeholder="请输入手机号" v-model="phone" />
			</view>
			<view class="inputWrapper">
				<input class=" yanzhengma" type="password" value="" placeholder="请获取验证码" v-model="yanzhengma" />
				<!-- 获取验证码区域 -->
				<view class="right" v-if="showText==true">
					<!-- 获取验证码事件 -->
					<button class="btn-code" @click="getCode()"> 获取验证码</button>
				</view>
				<!-- 点击按钮后显示此组件 -->
				<view class="right" v-else>
					<button class="btn-code" style="text-align: center;"> {{second}}s重新发送</button>
				</view>
			</view>
			<view class="loginBtn" @tap="gologinPage()">
				<text class="btnValue">登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				showText: true,
				phone: '',
				second: 60,
				yanzhengma: ""
			}
		},
		onLoad() {},
		methods: {

			// 登录事件
			gologinPage: function() {
				// let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/; //11位手机号码正则
				// if (!reg_tel.test(this.phone)) {
				// 	uni.showToast({
				// 		title: "请正确填写您的手机号码!",
				// 		icon: 'none'
				// 	})
				// }
				uni.switchTab({
					url: "/pages/index/index"
				})
			},

			//倒计时
			getCode() {
				// 点击事件执行，将第一个view隐藏，显示第二个view
				this.showText = false;
				// serInterval()属于HtmlDom,这种方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
				var interval = setInterval(() => {
					// 定义一个变量,以每次1000毫秒执行serInterval()方法，this.second执行自减一
					let times = --this.second
					// 样式问题：三目运算符,在times小于10的执行｛'0'+times｝，反之执行｛times｝
					this.second = times < 10 ? '0' + times : times //小于10秒补 0
				}, 1000)
				setTimeout(() => {
					// 由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。
					clearInterval(interval)
					// 六十秒后执行
					this.second = 60
					this.showText = true
				}, 60000)
			},
		},
		onLoad() {}
	}
</script>

<style>
	input:focus {}

	uni-button:after {
		border: none;
	}

	.right {
		width: 37%;
		height: 100%;
		background-color: #FFFFFF;
		border-radius: 40rpx;
	}

	.btn-code {
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		color: #555555;
		border: none;
		line-height: 80rpx;
		background-color: #FFFFFF;
		padding: 0;
	}

	.content {
		background: #F2F2F2;
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%
	}

	.form {
		padding: 0 80upx;
		box-sizing: border-box;
		margin-top: 160rpx;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 40rpx;
		box-sizing: border-box;
		padding: 0rpx 10rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
		display: flex;
		justify-content: flex-start;
		border-color: #66afe9;

	}

	.inputWrapper .input {
		width: 100%;
		height: 100%;
		text-align: left;
		font-size: 15px;
		padding-left: 10rpx;

	}

	.yanzhengma {
		width: 58%;
		height: 100%;
		text-align: left;
		font-size: 15px;
		border-right: 1rpx solid #CCCCCC;
		padding-left: 10rpx;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #2f77fe;
		border-radius: 50upx;
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.loginBtn .btnValue {
		color: white;
	}

	.forgotBtn {
		text-align: center;
		color: #EAF6F9;
		font-size: 30rpx;
		margin-top: 40rpx;
	}
</style>
