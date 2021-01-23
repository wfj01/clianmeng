<template>
	<view>
		<view class="bgview" :style="{backgroundImage:'url('+imagesrc+')'}">
			<view class="topview">
				<view class="item1">
					<view class="item1_text1">
						{{money.team_money?money.team_money:0}}
					</view>
					<view class="item1_text2">
						总交易量
					</view>
				</view>
				<view class="item2">
					<view class="item2_text1">
						{{money.money?money.money:0}}
					</view>
					<view class="item2_text2">
						总分润
					</view>
				</view>
			</view>
		</view>
		<view class="middlebox">
			<view class="box1">
				<view class="box1_text">
					直营
				</view>
				<view class="box1_text2">
					{{money.trad_money?money.trad_money:0}}
				</view>
			</view>
			<view class="box2">
				<view class="box2_text">
					团队
				</view>
				<view class="box2_text2">
					{{money.tuandui_trad_money?money.tuandui_trad_money:0}}
				</view>
			</view>
		</view>

		<view class="bottom_button">
			<button type="primary" @click="godetailPage()">分润详情</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc: '../../../static/image/banner-tixian.png',
				money:{}
			}
		},
		methods: {
			// 跳转到分润详情
			godetailPage: function() {
				uni.navigateTo({
					url: '/pages/index/detailsoffenrun/monthdetails/monthdetails'
				})
			},
			async loaddata() {
				var that = this;
				const res = await that.$myRuquest({
					url: '/Api/index/money_manger',
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'GET',
				})
				console.log(JSON.parse(res.data))
				this.money = JSON.parse(res.data).money
			}
		},
		mounted() {
			this.loaddata()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.bgview {
		background-size: cover;

		.topview {
			padding: 70rpx 30rpx 100rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			color: #FFFFFF;

			.item1 {
				width: 50%;
				text-align: center;
				border-right: 1rpx solid #FFFFFF;

				.item1_text1 {
					font-size: 40rpx;
				}

				.item1_text2 {
					font-size: 34rpx;
					margin-top: 12rpx;
				}
			}

			.item2 {
				width: 50%;
				text-align: center;
				border-left: 1rpx solid #FFFFFF;

				.item2_text1 {
					font-size: 40rpx;
				}

				.item2_text2 {
					font-size: 34rpx;
					margin-top: 12rpx;
				}
			}
		}
	}

	.middlebox {
		background-color: #FFFFFF;

		.box1 {
			display: flex;
			justify-content: flex-start;
			line-height: 100rpx;
			padding: 0rpx 30rpx 0rpx 70rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #CCCCCC;

			.box1_text {
				text-align: left;
				width: 30%;
				color: #AFAFAF;
				font-size: 30rpx;
				line-height: 100rpx;
			}

			.box1_text2 {
				text-align: left;
				width: 50%;
				color: #AFAFAF;
				font-size: 30rpx;
				line-height: 100rpx;
			}
		}

		.box2 {
			display: flex;
			justify-content: flex-start;
			line-height: 100rpx;
			padding: 0rpx 30rpx 0rpx 70rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #CCCCCC;

			.box2_text {
				text-align: left;
				width: 30%;
				color: #AFAFAF;
				font-size: 30rpx;
				line-height: 100rpx;
			}

			.box2_text2 {
				text-align: left;
				width: 50%;
				color: #AFAFAF;
				font-size: 30rpx;
				line-height: 100rpx;
			}
		}
	}

	.bottom_button {
		margin-top: 60rpx;
		padding: 50rpx 100rpx;
		box-sizing: border-box;
	}
</style>
