<template>
	<view>
		<view class="content">
			<view class="content_item1">
				累计收益（元）
			</view>
			<view class="content_item2">
				0
			</view>
		</view>
		<view class="marginTop">
			<view class="middlebox">
				<view class="item1">
					<view class="item1_list1">
						月份
					</view>
					<view class="item1_list2">
						交易金额（元）
					</view>
					<view class="item1_list3">
						收益（元）
					</view>
				</view>
			</view>
			<view class="middlebox">
				<view class="item1">
					<view class="item1_list1">
						团队收益
					</view>
					<view class="item1_list2">
						100
					</view>
					<view class="item1_list3">
						10
					</view>
				</view>
			</view>
			<view class="middlebox">
				<view class="item1">
					<view class="item1_list1">
						个人收益
					</view>
					<view class="item1_list2">
						90
					</view>
					<view class="item1_list3">
						40
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

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		background: #2f77fe;
		padding: 100rpx 0rpx;
		box-sizing: border-box;

		.content_item1 {
			width: 100%;
			text-align: center;
			font-size: 40rpx;
			color: #FFFFFF;
		}

		.content_item2 {
			width: 100%;
			text-align: center;
			font-size: 50rpx;
			color: #FFFFFF;
		}
	}

	.marginTop {
		margin-top: 20rpx;

		.middlebox {
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #CCCCCC;

			.item1 {
				display: flex;
				line-height: 60rpx;
				margin: 0rpx -20rpx;

				.item1_list1 {
					width: 33.3%;
					text-align: center;
				}

				.item1_list2 {
					width: 33.4%;
					text-align: center;
				}

				.item1_list3 {
					width: 33.3%;
					text-align: center;
				}
			}
		}

	}
</style>
