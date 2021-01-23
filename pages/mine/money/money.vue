<template>
	<view>
		<view class="top">
			<view class="topview" :style="{backgroundImage:'url('+imagesrc+')'}">
				<view class="topbox">
					<view class="item1">
						总收益/元：{{money.money ? money.money : 0.00}}
					</view>
					<view class="item2">
						<view class="item2_left">
							<view class="item2_left_text1">
								{{money.apply_money ? money.apply_money : 0.00}}
							</view>
							<view class="item2_left_text2">
								可提现金额/元
							</view>
						</view>
						<view class="item2_right">
							<view class="item2_right_text1">
								{{money.freeze_money ? money.freeze_money : 0.00}}
							</view>
							<view class="item2_right_text2">
								临时冻结金额/元
							</view>
						</view>
					</view>
					<view class="item3">
						<view class="item3_left">
							<view class="item3_left_text1">
								{{money.profits}}
							</view>
							<view class="item3_left_text2">
								分润收益/元
							</view>
						</view>
						<view class="item3_center">
							<view class="item3_center_text1">
								{{money.return_money?money.return_money:0.00}}
							</view>
							<view class="item3_center_text2">
								返现达标收益/元
							</view>
						</view>
						<view class="item3_right">
							<view class="item3_right_text1">
								{{money.already_integral?money.already_integral:0.00}}
							</view>
							<view class="item3_right_text2">
								分享金额/元
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="inputview">
			<input type="text" value="" class="inputstyle" placeholder="请输入提现金额" />
		</view>
		<view class="middlebox">
			<view class="middlebox_title">
				提现须知
			</view>
			<view class='bank-reminder'><text>*如果未绑定提现帐号，请先绑定提现帐号。\n*可提现金额要满足100元才可提现\n*税点需要扣除8%；\n*每笔提现手续费2元。\n*如有延迟，敬请谅解或者联系客服</text>
			</view>
		</view>
		<view class="bottomview">
			<view class="bottom_button" @click="gobindingPage()">
				绑定提现账号
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc: '../../../static/image/banner-tixian.png',
				money: "",
				info: ''
			}
		},
		methods: {
			// 跳转到绑定账号页面
			gobindingPage: function() {
				uni.navigateTo({
					url: '/pages/mine/binding/binding'
				})
			},

			//提示绑定提现帐号
			isBank: function() {
				uni.showModal({
					title: '提示',
					content: '请先绑定提现帐号！',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/mine/binding/binding'
							})
						} else if (res.cancel) {

						}
					}
				});
			},

			async loaddata() {
				const res = await this.$myRuquest({
					url: '/Api/user/bill',
					method: 'GET',
					data: {}
				})
				this.money = JSON.parse(res.data).bill;
				this.info = JSON.parse(res.data).info
				console.log('res', JSON.parse(res.data));
				if (this.info === 2) {
					this.isBank();
				}
			}
		},

		onLoad() {
			this.loaddata()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.top {
		width: 100%;

		.topview {
			width: 100%;
			background-size: cover;
			color: #FFFFFF;

			.topbox {
				padding: 30rpx 26rpx;
				box-sizing: border-box;

				.item1 {
					display: flex;
					font-size: 32rpx;
					line-height: 80rpx;
				}

				.item2 {
					display: flex;
					justify-content: space-between;
					text-align: center;
					line-height: 80rpx;
					margin-top: 70rpx;

					.item2_left {
						width: 33.3%;

						.item2_left_text1 {
							font-size: 60rpx;
						}

						.item2_left_text2 {
							font-size: 30rpx;
						}
					}

					.item2_right {
						width: 33.3%;

						.item2_right_text1 {
							font-size: 60rpx;
						}

						.item2_right_text2 {
							font-size: 30rpx;
						}
					}
				}

				.item3 {
					margin-top: 70rpx;
					display: flex;
					text-align: center;

					.item3_left {
						width: 33.33%;

						.item3_left_text1 {
							font-size: 50rpx;
						}

						.item3_left_text2 {
							font-size: 28rpx;
						}
					}

					.item3_center {
						width: 33.33%;

						.item3_center_text1 {
							font-size: 50rpx;
						}

						.item3_center_text2 {
							font-size: 28rpx;
						}
					}

					.item3_right {
						width: 33.33%;

						.item3_right_text1 {
							font-size: 50rpx;
						}

						.item3_right_text2 {
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}

	.inputview {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.inputstyle {
			line-height: 100rpx;
			height: 90rpx;
		}
	}

	.middlebox {
		.middlebox_title {
			font-size: 34rpx;
			margin-left: 30rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

		.bank-reminder {
			font-size: 30rpx;
			margin-left: 30rpx;
			color: #8a8a8a;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
		}
	}

	.bottomview {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		text-align: center;
		color: #FFFFFF;
		position: absolute;
		bottom: 0px;
		width: 100%;

		.bottom_button {
			background-color: #007AFF;
			line-height: 100rpx;
			border-radius: 60rpx;
		}
	}
</style>
