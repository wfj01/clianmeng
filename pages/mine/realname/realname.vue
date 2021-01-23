<template>
	<view class="page">
		<view class="top"></view>
		<view class="container">
			<text>手机号</text>
			<view class="section captcha">
				<input placeholder="请输入手机号" @input="getinputPhone" />
			</view>
			<text>验证码</text>
			<view class="section tel" style="border-bottom:1px solid #ccc;">
				<view class="left">
					<input placeholder="请输入验证码" @input="getyanzhengma" />
				</view>
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
			<text>真实姓名</text>
			<view class="section captcha">
				<input placeholder="请输入姓名" @input="getinputName" />
			</view>
			<text>身份证号码</text>
			<view class="section captcha">
				<input placeholder="请输入身份证号码" @input="getinputCard" />
			</view>
			<button class='btn-area' @click="tijiaoclick()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				showText: true,
				second: 60,
			}
		},
		mounted() {},
		methods: {
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
			// 获取手机号
			getinputPhone: function(e) {
				console.log("获取手机号", e.detail.value)
				this.phone = e.detail.value
			},

			// 获取验证码
			getyanzhengma: function(e) {
				console.log("获取验证码", e.detail.value)
			},

			// 获取真实姓名
			getinputName: function(e) {
				console.log("获取真实姓名", e.detail.value)
			},

			// 获取输入的身份证
			getinputCard: function(e) {
				console.log("获取身份证", e.detail.value)
			},

			// 提交数据
			tijiaoclick: function() {
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/; //11位手机号码正则

				if (!reg_tel.test(this.phone)) {
					uni.showToast({
						title: "请正确填写您的手机号码!",
						icon: 'none'
					})
				}
			}

		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.top {
		width: 100%;
		height: 20rpx;
		background: #F8F8F8;
	}

	.section {
		display: flex;
		align-items: center;
		width: 90%;
		height: 100rpx;
		background: #fff;
		margin-left: 5%;
		border-radius: 80rpx;
		box-shadow: 2rpx 2rpx 10rpx #3333;
	}

	.container text {
		margin-left: 10%;
		font-size: 30rpx;
		color: #939393;
		padding: 10px 0;
		line-height: 84rpx;

	}

	.section input {
		font-size: 28rpx;

	}

	.tel {
		display: flex;
	}

	.section .left,
	.section .right {
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.section .left {
		width: 70%;
		justify-content: flex-start;
		margin-left: 5%;
		border-right: 2rpx solid #333;
	}

	.section .right {
		width: 30%;
		flex-wrap: wrap;
		height: 50rpx;
		border-radius: 16rpx;
	}

	.section .right .btn-code {
		text-align: center;
		background: none !important;
		width: 100%;
		font-size: 26rpx;
		color: #808080;
		line-height: 30rpx;
	}

	.btn-code::after {
		border: none;
	}

	.captcha {
		padding-left: 5%;
		width: 85%;

	}

	.bottom {
		width: 100%;
		height: 918rpx;
		background: #F8F8F8;
	}

	.btn-area {
		/* position:absolute;
  top:450rpx;
  left:76rpx; */
		text-align: center;
		width: 80%;
		background: #2f77fe;
		border-radius: 20rpx;
		color: #fff;
		font-size: 28rpx;
		margin-top: 40rpx;


	}
</style>
