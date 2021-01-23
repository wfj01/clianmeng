<template>
	<view>
		<view class="topimage" :style="{backgroundImage:'url('+imagesrc+')'}">
			<view class="touxiang" @click="gopersonalinforPage()">
				<image src="../../static/logo.png" mode="" class="touxiangImage"></image>
				<view class="touxiang_right" @tap.stop="gorealnamePage()">
					<text>一二三四</text>
				</view>
			</view>
		</view>
		<view class="middlebox">
			<view class="box">
				<view class="item1">
					<view class="itm1_box1" @click="gomyorderPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/card.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>我的订单</text>
					</view>
					<view class="itm1_box1" @click="gomoneyPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/tixian.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>账户提现</text>
					</view>
					<view class="itm1_box1" @click="gocontactPage()">
						<view class="image">
							<image src="../../static/image/kefu.png" mode="" class="imagestyle"></image>
						</view>
						<text>联系客服</text>
					</view>
				</view>
				<view class="item1">
					<view class="itm1_box1" @click="gomessagePage()">
						<view class="image">
							<image src="../../static/image/xinshou.png" mode="" class="imagestyle"></image>
						</view>
						<text>消息通知</text>
					</view>
					<view class="itm1_box1">
						<view class="image">
							<image src="../../static/image/tel.png" mode="" class="imagestyle"></image>
						</view>
						<text>实名认证</text>
					</view>
					<view class="itm1_box1" @click="gobindingPage()">
						<view class="image">
							<image src="../../static/image/bank.png" mode="" class="imagestyle"></image>
						</view>
						<text>绑定银行卡</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc: 'https://www.chuanglianmengpt.com/Public/image/header.png'
			}
		},
		methods: {
			
			// 跳转到个人信息
			gopersonalinforPage:function(){
				uni.navigateTo({
					url:'/pages/mine/personalinfor/personalinfor'
				})
			},
			
			// 跳转到我的订单页面
			gomyorderPage: function() {
				console.log("14444")
				uni.navigateTo({
					url: "/pages/mine/myorder/myorder",
					success: function(res) {
						console.log("res", res)
					},
					fail: function(res) {
						console.log("res1", res)
					}
				})
			},
			// 消息通知
			gomessagePage: function() {
				uni.navigateTo({
					url: "/pages/mine/message/message"
				})
			},
			// 跳转到绑定银行卡页面
			gobindingPage: function() {
				uni.navigateTo({
					url: "/pages/mine/binding/binding"
				})
			},
			// 跳转到联系客服
			gocontactPage: function() {
				uni.navigateTo({
					url: '/pages/mine/contact/contact'
				})
			},
			// 跳转到提现页面
			gomoneyPage: function() {
				uni.navigateTo({
					url: '/pages/mine/money/money'
				})
			},
			
			// 跳转到实名认证
			gorealnamePage:function(){
				uni.navigateTo({
					url:'/pages/mine/realname/realname'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.topimage {
		width: 100%;
		height: 157px;
		background-size: cover;
		padding: 60rpx 40rpx 100rpx 40rpx;
		box-sizing: border-box;
		.touxiang{
			width: 100%;
			height: 160rpx;
			display: flex;
			.touxiangImage{
				border-radius: 50%;
				width: 160rpx;
				height: 160rpx;
			}
			
			.touxiang_right{
				line-height: 120rpx;
				margin-left: 30rpx;
			}
		}
	}

	.middlebox {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		background-color: #F2F2F2;

		.box {
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 5px;

			.item1 {
				display: flex;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;

				.itm1_box1 {
					width: 33%;
					display: inline-grid;
					text-align: center;

					text {
						font-size: 15px;
						color: #CCCCCC;
						margin-top: 5px;
					}

					.image {
						width: 100%;
						height: 35px;

						.imagestyle {
							width: 35px;
							height: 35px;
						}
					}

				}
			}
		}
	}
</style>
