<template>
	<view>
		<view class="box1">
			<view class="topview">
				<view class="">
					<swiper indicator-dots circular autoplay class="swiper">
						<swiper-item v-for="(item,index) in mydata" :key="index" class="swiper-item" @click="godetailpage(item)">
							<image :src="item.images_address" mode="" class="imagestyle"></image>
							<text class="banner-title">{{item.title}}</text>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="middlelist">
				<view class="listbox">
					<view class="listitem" v-for="(item,index) in mydata" :key="index" @click="godetailpage(item)">
						<view class="listitembox">
							<view class="listitembox_left">
								<view class="listitembox_left_item1">
									{{item.title}}
								</view>
								<view class="listitembox_left_item2">
									{{item.add_time}}
								</view>
							</view>
							<view class="listbox_right">
								<image :src="item.images_address" mode="" class="listbox_rightimage"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottomview" @click="gobrandlistPage()">
				<button type="default" class="bottom_button">更多</button>
			</view>
			<!-- <view class="bottomview" v-else style="text-align:  center;">
				----- 没有更多数据 -----
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mydata: [],
				ishavelist: true
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.loaddata();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//然后在对应的页面就能使用
		onReachBottom() { //与methods 同级
			console.log('页面到底了')
			this.ishavelist = false
		},
		methods: {

			// 跳转到详情页面
			godetailpage: function(item) {
				uni.navigateTo({
					url: "/pages/information/newsdetail/newsdetail?id=" + item.id,
				})

			},
			// 跳转到品牌列表页面
			gobrandlistPage: function() {
				uni.navigateTo({
					url: '/pages/information/brandlist/brandlist'
				})
			},

			// 加载数据
			loaddata() {
				uni.request({
					url: 'https://www.chuanglianmengpt.com/Api/index/content', //仅为示例，并非真实接口地址。
					headers: {
						'Content-Type': 'application/json'
					},
					success: (res) => {
						console.log("RESDATA::", res)
						this.mydata = res.data;
						
						for (var i = 0; i < this.mydata.length; i++) {
							var now = new Date(this.mydata[i].add_time * 1000);
							var year = now.getFullYear();
							var month = now.getMonth() + 1;
							if (month < 10) {
								month = '0' + month
							}
							var date = now.getDate();
							if (date < 10) {
								date = '0' + date
							}
							this.mydata[i].add_time = year + "-" + month + "-" + date;
						}
					}
				});
			}
		},
		mounted() {
			console.log('执行 ')
			this.loaddata();
		},

		onShow() {
			console.log('执行 ')
			this.loaddata();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.box1 {
		.topview {
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

					.banner-title {
						color: #151515;
						position: absolute;
						width: 100%;
						padding-left: 16px;
						padding-right: 16px;
						bottom: 0px;
						font-size: 18px;
						left: 0;
						background-color: #c5c5c5;
						opacity: 0.5;
						box-sizing: border-box;
					}
				}
			}
		}

		.middlelist {
			padding: 6px;
			box-sizing: border-box;

			.listbox {
				width: 100%;
				height: 100%;

				.listitem {
					background-color: #FFFFFF;
					padding: 10px;
					box-sizing: border-box;
					border-radius: 22rpx;
					margin: 8px 0px;

					.listitembox {
						display: flex;
						justify-content: space-between;

						.listitembox_left {
							.listitembox_left_item1 {
								font-size: 36rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								word-break: break-all;
								width: 330rpx;
							}

							.listitembox_left_item2 {
								margin-top: 50rpx;
								color: #CCCCCC;
								width: 330rpx;
							}
						}

						.listbox_right {
							margin-left: 16rpx;
							width: 400rpx;
							height: 200rpx;

							.listbox_rightimage {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}

		.bottomview {
			padding: 10px 15px;
			box-sizing: border-box;

			.bottom_button {
				background-color: #007AFF;
				color: #FFFFFF;
				border-radius: 20px;
			}
		}

	}
</style>
