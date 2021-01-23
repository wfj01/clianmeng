v<template>
	<view>
		<!-- 下划线不设置滑动效果 -->
		<ms-tabs :list="list2" v-model="active" lineColor="#007AFF" itemColor="#007AFF"></ms-tabs>
		<view class="topbox">
		</view>
		<view class="">
			<view class="item" v-for="(item,index) in list" :key="index" @tap="godetailPage(item.id)">
				<view class="itembox1">
					<view class="itembox1_left">
						{{item.title}}
					</view>
					<view class="itembox1_right">
						{{item.createtime}}
					</view>
				</view>
				<view class="itembox2">
					{{item.content}}
				</view>
			</view>
			<view class="loadmore" v-show='loading_state1 === 0' >
				<!-- <image class="icon active" src='' v-if="loading_state==1" /> -->
				<text v-if="loading_state===1">加载中</text>
				<text v-else-if="loading_state===2">没有更多数据了</text>
				<text v-if="loading_state===3">加载失败，请点击重试</text>
			</view>
		</view>
	</view>
</template>

<script>
	import sPullScroll from '@/components/s-pull-scroll';
	export default {
		components: {
			sPullScroll
		},
		data() {
			return {
				index: 0,
				loading_state: 0,
				loading_state1: 0,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				list2: [{
						title: '提醒'
					}, {
						title: '订货'
					},
					{
						title: '实名'
					},
					{
						title: '公告'
					}
				],
				pagesize: 10,
				pageno: 1,
				Size: 0,
				mydata: [],
				active: 0,
				state: "",
				list: [],
				result: []
			}
		},
		onPullDownRefresh() {
			this.loaddata()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 2000);
		},
		onReachBottom() {
			var that = this;
			this.loading_state1 = 0;
			console.log(that.index, that.pageno, this.loading_state1)
			if (this.loading_state1 === 0) {
				if (that.index <= that.pageno) {
					this.loading_state1 = 0;
					this.loading_state = 1;
					that.index++;
					setTimeout(function() {
						that.loading_state1 = 1
						that.list = [...that.list, ...that.result[that.index]]
					}, 600);
				} else {
					setTimeout(function() {
						that.loading_state1 = 0
						that.loading_state = 2;
					}, 600);
					return;
				}
			}
			console.log("执行", this.list)
		},
		methods: {
			async loaddata() {
				var that = this;
				that.mydata = []
				const res = await that.$myRuquest({
					url: '/api/news/news',
					data: {
						sort: that.active
					},
					method: 'POST'
				})
				that.mydata = JSON.parse(res.data).data
				that.state = JSON.parse(res.data).state
				that.list = that.mydata;
				that.Size = that.list.length;
				console.log(Math.ceil(that.Size / that.pagesize))
				that.pageno = Math.ceil(that.Size / that.pagesize)
				this.result = this.split_array(that.list, 10);
				that.list = this.result[0];
			},
			split_array(arr, len) {
				var a_len = arr.length;
				var result = [];
				for (var i = 0; i < a_len; i += len) {
					result.push(arr.slice(i, i + len));
				}
				return result;
			},
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loaddata(pullScroll);
				}, 200);
			},

			// 跳转到详情页面
			godetailPage: function(id) {
				console.log('id', id);
				uni.navigateTo({
					url: './detail/detail?id=' + id
				})
			},

		},
		onLoad() {
			this.loaddata(this.active)
		},
		watch: {
			active() {
				console.log(this.active) // 0
				this.list = [];
				this.pageno = 0;
				this.pagesize = 0;
				this.Size = 0;
				this.loading_state = 0;
				this.loaddata();
			}
		}
	}
</script>

<style>
	/*加载更多*/
	.loadmore {
		height: 100rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loadmore text {
		font-size: 26rpx;
		color: #999;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	.icon {
		width: 26rpx;
		height: 26rpx;
		margin-right: 20rpx;
	}

	.active {
		animation: weuiLoading 0.6s steps(12, end) infinite;
	}

	@keyframes weuiLoading {
		0% {
			transform: rotate3d(0, 0, 1, 0deg);
		}

		100% {
			transform: rotate3d(0, 0, 1, 360deg);
		}
	}

	.topbox {
		height: 100rpx;
	}

	.item {
		width: 100%;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.itembox1 {
		width: 100%;
	}

	.itembox1_left {
		color: rgb(7, 7, 7);
		font-size: 28rpx;
		padding: 0 0 8rpx 0;
	}

	.itembox1_right {
		color: rgb(7, 7, 7);
		font-size: 28rpx;
		line-height: 34rpx;
		float: right;
		text-align: right;
		position: absolute;
		right: 30rpx;
	}

	.itembox2 {
		width: 100%;
		text-align: left;
		margin-top: 10rpx;
		padding-bottom: 22rpx;
		font-size: 28rpx;
		color: #9A9C9B;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		border-bottom: solid 1px #ebebeb;
		height: 74rpx;
		line-height: 48rpx;
	}

	.itembox1 {
		display: flex;
		justify-content: space-between;
	}
</style>
