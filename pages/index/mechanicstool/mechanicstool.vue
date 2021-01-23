<template>
	<view>
		<!-- 下划线不设置滑动效果 -->
		<ms-tabs :list="list2" v-model="active2" lineColor="#007AFF" itemColor="#007AFF"></ms-tabs>
		<view class="topbox">

		</view>
		<view class="topview" v-show="active2 === 0">
			<view class="topviewbox">
				<input type="text" class="inputview" value="" placeholder="请输入要查询的机具序列号" />
				<button type="primary" class="button">查询</button>
			</view>
		</view>
		<view class="" v-show="active2 === 1">
			{{list2[1].title}}
		</view>
		<view class="" v-show="active2 === 2">
			{{list2[2].title}}
		</view>
		<view class="" v-show="active2 === 3">
			{{list2[3].title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list2: [{
						title: '全部'
					}, {
						title: '已激活'
					},
					{
						title: '未激活'
					}, {
						title: '已达标'
					}
				],
				active2: 0
			}
		},
		methods: {
			async loaddata(e) {
				const res = await this.$myRuquest({
					url: "/Api/index/machine",
					method: "POST",
					data: {
						type: e
					},
				})
				console.log("res", res)
			}
		},
		watch: {
			active2() {
				console.log(this.active2) // 0
				this.loaddata(this.active2)
			}
		},
		onLoad() {
			this.loaddata(this.active2)
		}
	}
</script>

<style lang="scss">
	.topbox {
		height: 100rpx;
	}

	.topview {
		width: 100%;
		padding: 10rpx 60rpx;
		box-sizing: border-box;
		border-bottom: solid 1px #ebebeb;

		.topviewbox {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			background-color: white;
			width: 100%;
			height: 80rpx;
			flex-wrap: nowrap;
			align-items: center;


			.inputview {
				font-size: 28rpx;
				color: #8a8a8a;
				height: 70rpx;
				width: 78%;
				border: 1rpx solid #CCCCCC;
				border-radius: 20rpx;
			}

			.button {
				padding: 0rpx 20rpx;
				line-height: 60rpx;
				margin: 0;
				font-size: 26rpx;
				width: 120rpx;
				height: 65rpx;
			}
		}
	}
</style>
