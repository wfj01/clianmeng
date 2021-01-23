<template>
	<view>
		<view class="topbox">
			<view class="item">
				<view class="item_left">
					头像
				</view>
				<view class="item_right">
					<image src="../../../static/image/2.jpeg" mode="" class="imagestyle"></image>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					姓名
				</view>
				<view class="item_right">
					<text>测试1</text>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					手机号码
				</view>
				<view class="item_right">
					<text>1526396555</text>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					用户等级
				</view>
				<view class="item_right">
					<text>0</text>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					直推人数
				</view>
				<view class="item_right">
					<text>0</text>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					间接直推人数
				</view>
				<view class="item_right">
					<text>0</text>
				</view>
			</view>
		</view>

		<view class="middlebox">
			<view class="item">
				<view class="item_left">
					姓名
				</view>
				<view class="item_right">
					<text>测试1</text>
				</view>
			</view>
			<view class="hengxian">

			</view>
			<view class="item">
				<view class="item_left">
					手机号码
				</view>
				<view class="item_right">
					<text>1526396555</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.topbox {
		padding: 10rpx 30rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		margin-top: 20rpx;

		.hengxian {
			border-bottom: 1rpx solid #F2F2F2;
		}

		.item {
			padding: 20rpx 0rpx 10rpx 0rpx;
			display: flex;
			justify-content: space-between;

			.item_left {
				line-height: 88rpx;
			}

			.item_right {
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);

				.imagestyle {
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
				}
			}
		}
	}

	.middlebox {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;
		box-sizing: border-box;

		.item {
			padding: 20rpx 0rpx 10rpx 0rpx;
			display: flex;
			justify-content: space-between;

			.item_left {
				line-height: 88rpx;
			}

			.item_right {
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);

				.imagestyle {
					height: 80rpx;
					width: 80rpx;
					border-radius: 50%;
				}
			}
		}

		.hengxian {
			border-bottom: 1rpx solid #F2F2F2;
		}
	}
</style>
