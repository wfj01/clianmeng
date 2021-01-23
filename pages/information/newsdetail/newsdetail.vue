<template>
	<view class="view">
		<view class="topview">
			<view class="toptext">
				{{itemtext.title}}
			</view>
			<view class="topview">
				<view class="tophx">
				</view>
				<view class="box">
					<view class="box1">
						<image :src="itemtext.images_address" mode="" class="imagestyle"></image>
					</view>
					<view class="box1_text">
						<u-parse :content="itemtext.content"></u-parse>
					</view>
					<view class="bottomtime">
						发布时间:{{itemtext.add_time}}
					</view>
				</view>
			</view>
		</view>
		<view class="middlelist">
			<view class="title">
				热点关注
			</view>
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
		<view class="xuanfuclass">
			<view class="xuanfuview">
				<view class="xuanfuview_left" @click="goindexPage()">
					<image src="../../../static/image/lefts.png" mode="" class="bottom_leftimage"></image>
				</view>
				<view class="xuanfuview_right">
					<view class="xuanfuview_rightbox">
						分享赚零钱
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				html: '',
				id: '',
				itemtext: [],
				mydata: []
			}
		},
		methods: {
			// 回到首页页面
			goindexPage: function() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 跳转到详情页面
			godetailpage: function(item) {
				uni.navigateTo({
					url: "/pages/information/newsdetail/newsdetail?id=" + item.id,
				})

			},
			getdetail() {
				uni.request({
					url: 'https://www.chuanglianmengpt.com/Api/index/art?id=' + this.id, //仅为示例，并非真实接口地址。

					headers: {
						'Content-Type': 'application/json'
					},
					success: (res) => {
						this.itemtext = res.data;
						console.log("djaijsdkjakdj", res.data)
						var now = new Date(this.itemtext.add_time * 1000);
						var year = now.getFullYear();
						var month = now.getMonth() + 1;
						if (month < 10) {
							month = '0' + month
						}
						var date = now.getDate();
						if (date < 10) {
							date = '0' + date
						}
						this.itemtext.add_time = year + "-" + month + "-" + date;
						console.log("this.itemtext.add_time", this.itemtext.add_time)
					}
				});


			},
			// async getdetaillist() {
			// 	const res = await this.$myRuquest({
			// 		url: '/Api/index/hot'
			// 	})
			// 	this.mydata = res.data;
			// 	console.log("RESDATA::", this.mydata)

			// 	for (var i = 0; i < this.mydata.length; i++) {
			// 		var now = new Date(this.mydata[i].add_time * 1000);
			// 		var year = now.getFullYear();
			// 		var month = now.getMonth() + 1;
			// 		if (month < 10) {
			// 			month = '0' + month
			// 		}
			// 		var date = now.getDate();
			// 		if (date < 10) {
			// 			date = '0' + date
			// 		}
			// 		this.mydata[i].add_time = year + "-" + month + "-" + date;
			// 	}
			// }
			getdetaillist() {
				uni.request({
					url: 'https://www.chuanglianmengpt.com/Api/index/hot', //仅为示例，并非真实接口地址。
					headers: {
						'Content-Type': 'application/json'
					},
					success: (res) => {
						this.mydata = res.data;
						console.log("RESDATA::", this.mydata)

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
		onLoad(option) {
			var that = this;
			console.log("id", option.id)
			that.id = option.id
			that.getdetail();
			that.getdetaillist();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.view {
		.topview {
			position: relative;
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			background: #fff;
			color: black;
			font-size: 38rpx;
			line-height: 48rpx;
			text-align: center;

			.toptext {}

			.tophx {
				border-top: 1px solid #CCCCCC;

			}

			.box {
				background: #fff;
				margin-top: 15px;
				width: 100%;

				.box1 {
					background: #fff;
					width: 100%;
					height: 100%;

					.imagestyle {
						width: 100%;
						height: 400rpx;
					}
				}

				.box1_text {
					font-size: 30rpx;
					color: #4c4c4c;
					text-align: left;
					line-height: 60rpx;
				}

				.bottomtime {
					margin-top: 15px;
					font-size: 30rpx;
					color: #4c4c4c;
				}
			}
		}

		.middlelist {
			padding: 6px;
			box-sizing: border-box;

			.title {
				color: red;
				height: 72rpx;
				line-height: 72rpx;
				padding: 0 30rpx;
				width: 100%;
				font-size: 40rpx;
				padding-left: 32rpx;
				padding-right: 32rpx;
				font-weight: bold;
			}

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

		.xuanfuclass {
			left: 0;
			position: fixed;
			bottom: 0;
			width: 100%;
			padding: 40rpx 60rpx;
			box-sizing: border-box;

			.xuanfuview {
				width: 100%;
				height: 100%;
				background: #2f77fe;
				padding: 15rpx 10rpx;
				border-radius: 40rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.xuanfuview_left {
					width: 120rpx;
					height: 70rpx;
					padding: 0rpx 15rpx;

					.bottom_leftimage {
						width: 120rpx;
						height: 70rpx;
						padding: 0rpx 15rpx;
					}
				}

				.xuanfuview_right {
					margin-right: 15rpx;
					padding: 10rpx 30rpx 10rpx 20rpx;
					box-sizing: border-box;
					background-color: #ff6666;
					color: #FFFFFF;
					border-radius: 35rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
