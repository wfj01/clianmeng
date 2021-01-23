<template>
	<view>
		<view class="top">
			<view class="bgImage" :style="{backgroundImage:'url('+imagesrc+')'}">
				<button class="bgImage_text1" plain>
					本期总奖金
				</button>
				<view class="bgImage_text2">
					￥<text class="bgImage_text3">{{datalist.money}}</text>
				</view>
				<view class="bgImage_text4">
					<view class="bgImage_text4_list1">
						本期结算倒计时
					</view>
					<view class="bgImage_text4_list2">
						{{day}}天 {{hr}}时 {{min}}分 {{sec}}秒
					</view>
				</view>
				<view class="hengxian">

				</view>
				<view class="bgImage_bottomview">
					<view class="bgImage_bottomview_left">
						第{{datalist.num}}期直推排行榜
					</view>
					<view class="bgImage_bottomview_right" @click="godetailPage()">
						查看排行榜》
					</view>
				</view>
			</view>
		</view>
		<view class="middlebox">
			<view class="box">
				<view class="listitem1">
					<view class="box1">
						--
					</view>
					<view class="box2">
						<image src="../../../static/logo.png" mode="" class="imagestyle"></image>
					</view>
				</view>
				<view class="box3">
					<view class="box3_item1">
						我的业绩
					</view>
					<view class="box3_item2">
						本期直推0台
					</view>
				</view>
			</view>
		</view>
		<view class="listbox">
			<view class="listitem" v-for="(item,index) in mydata" :key="index">
				<view class="listitem1">
					<view class="listitem1_item1">
						<image src="../../../static/image/one.jpg" v-if="item.sort === 1" mode="" class="imagestyle"></image>
						<image src="../../../static/image/two.jpg" v-if="item.sort === 2" mode="" class="imagestyle"></image>
						<image src="../../../static/image/three.jpg" v-if="item.sort === 3" mode="" class="imagestyle"></image>
					</view>
					<view class="listitem1_item2">
						<image :src="item.avatarurl" mode="" class="imagestyle"></image>
					</view>
				</view>
				<view class="listitem2">
					<view class="listitem2_item1">
						{{item.name}}
					</view>
					<view class="listitem2_item2">
						本期直推{{item.have_num}}台
					</view>
				</view>
				<view class="listitem3">
					<view class="listitem3_item1">
						未达标
					</view>
					<view class="listitem3_item2">
						额外奖金
					</view>
				</view>
				<view class="listitem4">
					<view class="listitem4_item1">
						{{item.money}}
					</view>
					<view class="listitem4_item2">
						总奖金
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
				imagesrc: '../../../static/image/banner-tixian.png',
				mydata: [],
				datalist: {},
				end_time: '',
				create_time: "",
				datatime: '',
				NowTime: "",
				total_micro_second: "",
				second:"",
				day:"",
				hr:"",
				min:"",
				sec:"",
			}
		},
		methods: {
			// 跳转到详情页面
			godetailPage: function() {
				const id = 301
				uni.navigateTo({
					url: '/pages/information/newsdetail/newsdetail?id=' + id
				})
			},

			// 加载数据
			async loaddata() {
				var that = this;
				const res = await this.$myRuquest({
					url: "/api/reward/getReward",
					method: 'POST'
				})
				this.mydata = JSON.parse(res.data).data.list
				this.end_time = new Date(JSON.parse(res.data).data.reward.end_time).getTime();
				this.NowTime = new Date().getTime();
				this.total_micro_second = this.end_time - this.NowTime;
				this.happenTimeFun(this.total_micro_second)
				if (this.second <= 0) {
					that.setData({
						clock: "已经截止"
					});
					//return;
				}
				setTimeout(function() {
					this.second -= 1000;
					that.loaddata();
					
				}, 1000)
				
				this.datalist = JSON.parse(res.data).data.reward
			},

			happenTimeFun(num) { //时间戳数据处理
				// 总秒数
				this.second = Math.floor(num / 1000);
				// 天数
				this.day = Math.floor(this.second / 3600 / 24);
				// 小时
				this.hr = Math.floor(this.second / 3600 % 24);
				// 分钟
				this.min = Math.floor(this.second / 60 % 60);
				// 秒
				this.sec = Math.floor(this.second % 60);
			},
		},
		onShow() {
			this.loaddata()
		}
	}
</script>

<style lang="scss">
	.imagestyle {
		width: 60rpx;
		height: 60rpx;
		padding-top: 7px;
		padding-right: 7px;
	}

	page {
		background-color: #F2F2F2;
	}

	.top {
		.bgImage {
			width: 100%;
			background-size: cover;
			padding: 40rpx 40rpx 0px 40rpx;
			box-sizing: border-box;

			.bgImage_text1 {
				text-align: center;
				width: 290rpx;
				border: 2rpx solid rgb(248, 232, 2);
				color: rgb(248, 232, 2);
				height: 80rpx;
				line-height: 80rpx;
			}

			.bgImage_text2 {
				margin-top: 20rpx;
				color: rgb(248, 232, 2);
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;

				.bgImage_text3 {
					font-size: 70rpx;
				}
			}

			.bgImage_text4 {
				margin-top: 20rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				line-height: 100rpx;
			}

			.hengxian {
				border: 1rpx solid #FFFFFF;
				margin: 0px -38rpx;
			}

			.bgImage_bottomview {
				color: #FFFFFF;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				line-height: 100rpx;

				.bgImage_bottomview_left {}

				.bgImage_bottomview_right {}
			}
		}
	}

	.middlebox {
		padding: 30rpx 0px;
		background-color: #FFFFFF;

		.box {
			display: flex;

			.listitem1 {
				display: flex;
				width: 20%;
				padding: 0rpx 20rpx;
				display: flex;
				justify-content: space-between;

				.box1 {
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
				}

				.box2 {
					width: 80rpx;
					height: 80rpx;

					.imagestyle {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
			}


			.box3 {
				height: 80rpx;
				margin-left: 20rpx;

				.box3_item1 {}

				.box3_item2 {
					color: #AFAFAF;
					font-size: 30rpx;
				}
			}
		}
	}

	.listbox {
		margin-top: 20rpx;
		background-color: #FFFFFF;

		.listitem {
			width: 100%;
			display: flex;
			text-align: center;
			padding: 30rpx 0px;
			box-sizing: border-box;
			border: 1px solid #CCCC;

			.listitem1 {
				display: flex;
				width: 20%;
				padding: 0rpx 20rpx;
				display: flex;
				justify-content: space-between;

				.listitem1_item1 {
					line-height: 80rpx;
				}

				.listitem1_item2 {
					.imagestyle {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
			}

			.listitem2 {
				width: 25%;

				.listitem2_item1 {
					color: black;
					font-size: 16px;
					padding: 0 0 8rpx 0;
					font-weight: 700;
				}

				.listitem2_item2 {
					color: #AFAFAF;
					font-size: 30rpx;
					line-height: 34rpx;
					font-size: 30rpx;
				}
			}

			.listitem3 {
				width: 25%;

				.listitem3_item1 {
					color: red;
					font-size: 16px;
					padding: 0 0 8rpx 0;
					font-weight: 700;
				}

				.listitem3_item2 {
					color: #AFAFAF;
					font-size: 30rpx;
					line-height: 34rpx;
					font-size: 30rpx;
				}
			}

			.listitem4 {
				width: 25%;

				.listitem4_item1 {
					color: red;
					font-size: 16px;
					padding: 0 0 8rpx 0;
					font-weight: 700;
				}

				.listitem4_item2 {
					color: #AFAFAF;
					font-size: 30rpx;
					line-height: 34rpx;
					font-size: 30rpx;
				}
			}

		}
	}
</style>
