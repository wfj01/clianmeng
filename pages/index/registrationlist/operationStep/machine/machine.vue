<template>
	<view class="page">
		<view class="top"></view>
		<view class="container">
			<text>请输入使用用户的姓名*</text>
			<view class="section captcha">
				<input placeholder="请输入绑定商户的姓名" @input="getinputName" />
			</view>
			<text>请输入使用用户手机号*</text>
			<view class="section captcha">
				<input placeholder="请输入使用用户手机号" @input="getinputPhone" />
			</view>
			<text>请输入需要绑定的sn号*</text>
			<view class="section tel" style="border-bottom:1px solid #ccc;">
				<view class="left">
					<input placeholder="请输入需要绑定的sn号" @input="getinputsn" v-model="sn" />
				</view>
				<!-- 获取验证码区域 -->
				<view class="right" v-if="showText==true">
					<!-- 获取验证码事件 -->
					<button class="btn-code" @click="getCode()">扫一扫</button>
				</view>
				<!-- 点击按钮后显示此组件 -->
				<view class="right" v-else>
					<button class="btn-code" style="text-align: center;"> {{second}}s重新发送</button>
				</view>
			</view>

			<button class='btn-area' @click="tijiaoclick()">确定绑定</button>
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
				name: '',
				sn: '',
				pid: ""
			}
		},
		mounted() {},
		methods: {
			//扫码
			getCode() {
				var that = this
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码内容：' + res.result);
						that.sn = res.result
					}
				});
			},
			// 获取手机号
			getinputPhone: function(e) {
				console.log("获取手机号", e.detail.value)
				this.phone = e.detail.value
			},


			// 获取真实姓名
			getinputName: function(e) {
				console.log("获取真实姓名", e.detail.value)
				this.name = e.detail.value;
			},

			// 获取输入的sn
			getinputsn: function(e) {
				console.log("获取身份证", e.detail.value)
				this.sn = e.detail.value
			},

			// 提交数据
			async tijiaoclick() {
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/; //11位手机号码正则

				if (this.name === '') {
					uni.showToast({
						title: "使用用户的姓名不能为空",
						icon: 'none'
					})
					return
				}

				if (!reg_tel.test(this.phone)) {
					uni.showToast({
						title: "请正确填写您的手机号码!",
						icon: 'none'
					})
					return
				}

				if (this.sn === '') {
					uni.showToast({
						title: 'sn号不能为空',
						icon: 'none'
					})
					return
				}
				const res = await this.$myRuquest({
					url: '/api/shop/fetchmachine',
					method: "POST",
					data: {
						'pos_id': this.pid,
						'number': this.sn,
						'tel': this.phone,
						'name': this.name
					}
				})

				console.log(JSON.parse(res.data).data)
				var i = JSON.parse(res.data)
				if (i.data == 1) {
					uni.showToast({
						title: '绑定成功！',
						icon: 'SUCCESS',
						image: '',
						duration: 1000
					})
					uni.switchTab({
						url: '../../index/index'
					})
				} else if (i.data == -1) {
					uni.showToast({
						title: '该sn不存在，请检查后在绑定！',
						icon: 'none',
						image: '',
						duration: 1000
					})
				} else if (i.data == 2) {
					uni.showToast({
						title: '该sn已绑定，请检查后在绑定！',
						icon: 'none',
						image: '',
						duration: 1000
					})
				} else {
					uni.showToast({
						title: '请重新提交！',
						icon: 'none',
						image: '',
						duration: 1000
					})
				}
			}

		},

		onLoad(options) {
			console.log(options.pid)
			this.pid = options.pid
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
		height: 90rpx;
		background: #fff;
		margin-left: 5%;
		border-radius: 80rpx;
		box-shadow: 2rpx 2rpx 10rpx #3333;
		border: 1rpx solid #CCCCCC;
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
		font-weight: bold;
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
		text-align: center;
		width: 87%;
		background: #2f77fe;
		border-radius: 20rpx;
		color: #fff;
		font-size: 28rpx;
		margin-top: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
</style>
