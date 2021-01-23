<template>
	<view>
		<view class="toptitle">
			绑定的机具列表
		</view>
		<view class="middlebox">
			<view class="box1">
				总数:0
			</view>
			<view class="box2">
				<input type="text" value="" class="inputview" placeholder="请输入要查询的机具序列号" />
			</view>
			<view class="box3 bottombutton">
				<button type="primary" class="buttonview">查询</button>
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

<style>
	.box1 {
		line-height: 80rpx;
		height: 80rpx;
		color: #818A8F;
		font-size: 30rpx;
		width: 20%;
	}

	.box2 {
		margin: 0px 20rpx;
		width: 60%;
	}

	.box3 {
		width: 20%;
	}

	.inputview {
		line-height: 80rpx;
		height: 70rpx;
		color: #818A8F;
		font-size: 30rpx;
		border: 1px solid #3333;
		border-radius: 20rpx;
		
	}

	.toptitle {
		text-align: center;
		line-height: 100rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		background-color: #007AFF;
	}

	.middlebox {
		display: flex;
		height: 80rpx;
		padding: 8rpx 20rpx;
		box-sizing: border-box;
	}

	.buttonview {
		height: 60rpx;
		line-height: 60rpx;
		margin: 15rpx 0px;
		font-size: 30rpx;
		float: right;
	}

	.bottombutton {
		display: flex;
		justify-content: flex-end;


	}
</style>
