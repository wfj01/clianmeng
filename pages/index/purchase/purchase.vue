<template>
	<view>
		<view class="topview">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper" circular>
				<swiper-item class="swiper-item" v-for="(item,index) in imagelist " :key="index">
					<image :src="'https://www.chuanglianmengpt.com'+item.images_address" mode="" class="imagestyle"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="middlebox">
			<view class="itembox" v-for="(item,index) in mydata" :key="index" @tap="godetailPage(item.id)">
				<image :src="item.show_address" mode="" class="image"></image>
				<view class="itembox_title">{{item.shop_type}}</view>
				<view class="itembox_box1">
					<text class="gmx">￥{{item.price}}</text>
					<text class="gmxx">￥{{item.ys_price}}</text>
				</view>
				<view class="itembox_box2">
					<text class="wenzi">新品</text>
					<text class="ku">销量：{{item.buy_num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagelist: [],
				mydata:[]
			}
		},
		onPullDownRefresh() {
			this.loadata();
			setTimeout(function(){
				uni.stopPullDownRefresh();
			},2000)
		},
		methods: {
			
			// 跳转到详情页面
			godetailPage:function(id){
				uni.navigateTo({
					url:'/pages/index/purchaseDetail/purchaseDetail?id='+id
				})
			},
			
			// 加载数据
			async loadata(){
				var that  = this;
				const res = await this.$myRuquest({
					url:"/Api/shop/news"
				})
				that.mydata = JSON.parse(res.data).sales;
				that.imagelist = JSON.parse(res.data).news;
				console.log("res",JSON.parse(res.data))
			}
		},
		mounted() {
			this.loadata()
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
		height: 200px;

		.swiper-item {
			width: 100%;
			height: 200px;

			.imagestyle {
				width: 100%;
				height: 200px;
			}
		}
	}

	.middlebox {
		padding: 20rpx;
		box-sizing: border-box;
		width: 100%;

		.itembox {
			width: 47%;
			display: inline-block;
			border: 1rpx solid #F2F2F2;
			margin: 15rpx 6rpx;

			.image {
				width: 100%;
				height: 300rpx;
			}

			.itembox_title {
				width: 300rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 30rpx;
				margin: 0;
				height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.itembox_box1 {
				display: flex;
				justify-content: space-between;
				padding: 8rpx;
				box-sizing: border-box;

				.gmx {
					color: red;
				}

				.gmxx {
					font-size: 26rpx;
					margin-right: 10rpx;
					text-decoration: line-through;
					color: #999;
				}
			}

			.itembox_box2 {
				display: flex;
				justify-content: space-between;
				padding: 8rpx;
				box-sizing: border-box;

				.wenzi {
					font-size: 30rpx;
					width: 30%;
				}

				.ku {
					text-align: right;
					width: 50%;
					font-size: 30rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
