<template>
	<view>
		<!-- 下划线不设置滑动效果 -->
		<ms-tabs :list="list2" v-model="active2" lineColor="#007AFF" itemColor="#007AFF"></ms-tabs>
		<view class="height">

		</view>
		<view class="itembox">
			<view class="ctnt0" v-show="active2 === 0">
				<view class="team_num">
					通讯录：{{count}}
				</view>
				<block v-for="(item, index) in customer" :key="index">
					<view class="notify-item flex-wrp">
						<view class="notify-content flex-item" @tap="customerFun" :data-id="item.id">
							<view class="customer_count"> <text class="notify-source" v-if="item.nickname||item.name" decode="true">{{item.name?item.name:item.nickname}}&nbsp;A{{item.level_name}}</text>
								<text class="notify-sources" v-if="item.level1_all_count" decode="true">用户数：{{item.level1_all_count}}&nbsp;({{item.level1_count}})</text>
							</view>
							<text class="notify-title " @tap="customerFun" :data-id="item.id">{{item.tel}} </text>
							<text class="notify-title " @tap="customerFun" :data-id="item.id">注册时间：{{item.create_time}} </text>
							<button class="tel_button" @tap="makePhoneCall" v-if="item.tel > 0" :data-tel="item.tel">联系</button>
						</view>
					</view>

				</block>

			</view>
			<view class="ctnt1" v-show="active2 === 1">
				<block v-for="(item, index) in customer" :key="index">
					<view class="notify-item flex-wrp">
						<view class="avatar flex-item">
							<image :src="item.avatarurl" v-if="item.avatarurl"></image>
							<image src="/static/images/photo.png" v-else></image>
						</view>
						<view class="notify-content flex-item">
							<text class="notify-source" decode="true">{{item.nickname?item.nickname:'服务商'}}</text>
							<text class="notify-title " decode="true">{{item.tel>0?item.tel:'未实名'}} </text>
							<button class="tel_button" @tap="makePhoneCall" v-if="item.tel>0" :data-tel="item.tel">联系</button>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list2: [{
					title: '实名'
				}, {
					title: '未实名'
				}, ],
				currentNavtab: "0",
				count: "",
				customer: "",
				data: "",
				active2: 0
			}
		},
		methods: {
			async loaddata(e) {
				const res = await this.$myRuquest({
					url: '/api/index/allTeam',
					data: {
						type: e,
					},
					method: 'POST'
				})
				console.log('res', JSON.parse(res.data));
				this.count = JSON.parse(res.data).data.count
				this.customer = JSON.parse(res.data).data.level1
			},
			// 联系
			makePhoneCall: function(e) {
				console.log(e);
				uni.makePhoneCall({
					phoneNumber: e.target.dataset.tel,
					success: function() {
						console.log("成功拨打电话");
					}
				});
			},

		},
		watch: {
			active2() {
				console.log(this.active2) // 0
				this.loaddata(this.active2)
			}
		},
		onLoad() {
			this.loaddata(0)
		}
	}
</script>

<style lang="scss">
	.itembox{
		padding:6px 20rpx 20rpx 20rpx;
		border-radius: 30rpx;
		box-sizing: border-box;
	}
	.height {
		height: 100rpx;
	}

	page {
		background-color: #F2F2F2;
	}

	.middlebox {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.box {
			width: 100%;
		}
	}

	.container {
		/* height: 1500rpx; */
		width: 100%
	}

	.unread {
		color: #9A9C9B;
		height: 60rpx;
		padding: 10rpx 40rpx;
		text-align: left;
		width: 670rpx;
	}

	.unread text {
		display: inline-block;
		line-height: 60rpx;
		font-size: 22rpx;
	}

	.unread image {
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		vertical-align: middle;
		float: right;
	}

	.notify-item {
		background: #ffffff;
		padding: 25rpx 40rpx 25rpx 0;
		border-bottom: solid 1px #ebebeb;
		/* border-radius:10px; */
		/* margin-top:10px; */
		box-shadow: 0px 0 5px #bebebe;
	}

	.notify-item image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 80rpx;
		margin-left: 10%;
	}

	.notify-item .avatar {
		flex: 1;
	}

	.notify-item .notify-content {
		flex: 4;
		text-align: left;
	}

	.notify-item .notify-content text {
		display: block;
	}

	.notify-item .notify-content .notify-source {
		color: #818A8F;
		font-size: 16px;
		padding: 0 0 8rpx 0;
		font-weight: 700;
		padding-left: 20rpx;

	}

	.notify-item .notify-content .notify-title {
		color: #AFAFAF;
		font-size: 30rpx;
		line-height: 34rpx;
		padding-left: 20rpx;
		width: 60%;

	}

	.placehold {
		padding: 80rpx 0;
		font-size: 28rpx
	}

	.tel_button {
		float: right;
		background: #2f77fe;
		color: #fff;
		width: 20%;
		font-size: 24rpx;
		margin-top: -70rpx;
		border-radius: 20px;
		right: 20rpx;


	}

	.ctnt0,
	.ctnt1 {
		width: 100%;
		/* padding: 0 10px; */
	}

	.team_num {
		background: #ffffff;
		font-size: 28rpx;
		height: 80rpx;
		align-items: center;
		display: flex;
		padding-left: 20rpx;
	}

	.customer_count {
		display: flex;
		width: 60%;

	}

	.notify-sources {
		float: right;
		position: absolute;
		padding: 0 0 8rpx 0;
		right: 45%;
		font-size: 26rpx;
	}
</style>
