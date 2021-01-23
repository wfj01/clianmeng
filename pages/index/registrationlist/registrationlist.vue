<template>
	<view class="middleview">
		<view class="item" v-for="(item,index) in mydata" @click="gooperationStep(item)">
			<view class="imageview">
				<image :src="item.images_address" class="imagestyle" mode=""></image>
			</view>
			<view class="item_text">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			mydata:{}
			}
		},
		methods: {
			// 跳转到操作步骤页面
			gooperationStep:function(item){
				uni.navigateTo({
					url:'/pages/index/registrationlist/operationStep/operationStep?item='+JSON.stringify(item)
				})
			},
			
			// 加载数据
			async loaddata(){
				const res = await this.$myRuquest({
					url:"/api/shop/get_brand?version=1.1.6"
				})
				this.mydata = JSON.parse(res.data).data;
				console.log("fhjahsj",this.mydata)
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

	.middleview {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.item {
			width: 100%;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			justify-content: flex-start;
			margin: 10rpx 0rpx 25rpx 0rpx;
			.imageview {
				width: 140rpx;
				height: 140rpx;
				margin-left: 50rpx;
				.imagestyle {
					width: 140rpx;
					height: 140rpx;
				}
			}

			.item_text {
				color: #333333;
				font-size: 36rpx;
				padding: 0 0 8rpx 0;
				font-weight: 700;
				line-height: 140rpx;
				margin-left: 50rpx;
			}
		}
	}
</style>
