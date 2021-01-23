<template>
	<view class="content">
		<view class="topview">
			<view class="bg">
				<view class="bgview" :style="{backgroundImage:'url('+imagesrc+')'}">
					<view class="item">
						<view class="item_text">
							<text class="shuzi">{{money.money?money.money:'0.00'}}</text>
							元
						</view>
						<view class="item_text1">
							总收益
						</view>
					</view>
					<view class="item">
						<view class="item1">
							<view class="item1_box1">
								<view class="item1_box1_item1">
									{{money.money?money.money:'0.00'}}
								</view>
							</view>
							<view class="item1_box2">
								<view class="item1_box2_item1">
									{{count}}
								</view>
							</view>
							<view class="item1_box3">
								<view class="item1_box3_item1">
									{{trad_money}}
								</view>
							</view>
						</view>
						<view class="item2">
							<view class="item2_box1">
								<view class="item1_box1_item1">
									分享
								</view>
							</view>
							<view class="item2_box2">
								<view class="item1_box2_item1">
									本月新增服务商
								</view>
							</view>
							<view class="item2_box3">
								<view class="item1_box3_item1">
									交易量
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="message">
			<view class="messageview">
				lalallalalallaallalallala
			</view>
		</view>
		<view class="box">
			<view class="'boxview">
				<view class="boxview_item1">
					<view class="boxview_item1_list1" @click="gobonusPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/hongbao.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>联盟奖金</text>
					</view>
					<view class="boxview_item1_list1" @click="gopurchasePage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/desk_bid@2x.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>机具采购</text>
					</view>
					<view class="boxview_item1_list1" @click="gobonuslistPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/reward.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>奖金榜</text>
					</view>
					<view class="boxview_item1_list1" @click="gomechanicstoolPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/desk_massage@2x.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>机具管理</text>
					</view>
				</view>
				<view class="boxview_item1">
					<view class="boxview_item1_list1" @click="goregistrationlistPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/dj.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>商户登记</text>
					</view>
					<view class="boxview_item1_list1" @click="gomeratchPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/shanghu.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>商户资料</text>
					</view>
					<view class="boxview_item1_list1" @click="goproviderPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/fws.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>服务商</text>
					</view>
					<view class="boxview_item1_list1" @click="godetailsoffenrunPage()">
						<view class="image">
							<view class="image">
								<image src="../../static/image/fenrun.png" mode="" class="imagestyle"></image>
							</view>
						</view>
						<text>分润详情</text>
					</view>
				</view>
			</view>
		</view>

		<view class="text">
			<view class="line_flag"></view>
			<text>新进服务商</text>
			<view class="customer" @tap='goproviderPage()'>查看更多</view>
		</view>

		<view class="modal-box" v-show="home_true">
			<view class="modal-body">
				<view class="modal-contents">
					<image :src="pic" mode="widthFix" style="width: 100%;"></image>
					<view style="display: flex;">
						<button style='margin-top:10px;width: 40%;background:#2f77fe;color:#fff' @tap='look_sales'>查看</button>
						<button style='margin-top:10px;width: 40%;' @tap='flag_truess'>关闭</button>
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
				imagesrc: ('https://www.chuanglianmengpt.com/Public/image/banner.jpg'),
				pic: "",
				home_true: true,
				home_trues: 0,
				money: ""
			}
		},
		methods: {

			// 查看
			look_sales: function() {
				wx.navigateTo({
					url: '/pages/index/purchase/purchase',
				})
			},

			// 关闭
			flag_truess: function() {
				this.home_true = false;
				this.home_trues = 1;
			},

			// 跳转到联盟奖金页面
			gobonusPage: function() {
				uni.navigateTo({
					url: '/pages/index/bonus/bonus'
				})
			},
			// 跳转到机具采购页面
			gopurchasePage: function() {
				uni.navigateTo({
					url: '/pages/index/purchase/purchase'
				})
			},

			// 跳转到我的机具页面
			gomechanicstoolPage: function() {
				uni.navigateTo({
					url: '/pages/index/mechanicstool/mechanicstool'
				})
			},

			// 跳转到奖金榜
			gobonuslistPage: function() {
				uni.navigateTo({
					url: '/pages/index/bonuslist/bonuslist'
				})
			},

			// 跳转到商户登记页面
			goregistrationlistPage: function() {
				uni.navigateTo({
					url: '/pages/index/registrationlist/registrationlist'
				})
			},

			// 跳转到分润详情
			godetailsoffenrunPage: function() {
				uni.navigateTo({
					url: '/pages/index/detailsoffenrun/detailsoffenrun'
				})
			},

			//跳转到服务商
			goproviderPage: function() {
				uni.navigateTo({
					url: '/pages/index/provider/provider'
				})
			},

			// 跳转到商户资料列表
			gomeratchPage: function() {
				uni.navigateTo({
					url: '/pages/index/merchats/merchats'
				})
			},

			// 加载数据1
			async loaddata1() {
				const res = await this.$myRuquest({
					url: '/Api/index/team',
					method: "POST",
					data: {}
				})
				console.log('res',JSON.parse(res.data).data.count);
				this.customer = JSON.parse(res.data).level1;
				this.count = JSON.parse(res.data).data.count;
			},

			// 加载数据2
			async loaddata() {
				var that = this;
				const res = await this.$myRuquest({
					url: '/Api/index/money_manger',
					data: {},
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},

				})
				console.log(JSON.parse(res.data).pic)
				that.pic = JSON.parse(res.data).pic
				console.log("that.reward_true0", that.home_true)
				if (JSON.parse(res.data).reward) {
					that.reward_true = false
				}
				console.log("that.reward_true1", that.home_true, JSON.parse(res.data).info === 1 && that.home_trues === 0)
				if (JSON.parse(res.data).info === 1 && that.home_trues === 0) {
					that.pic = JSON.parse(res.data).pic;
					that.home_true = false
					console.log("that.reward_true2", that.home_true)
				}
				console.log("that.reward_true3", that.home_true)
				that.money = JSON.parse(res.data).money;
				that.trad_money = JSON.parse(res.data).tuandui_trad_money
			}

		},

		onLoad() {
			this.loaddata()
			this.loaddata1();
		}
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	view .text {
		display: flex;
		align-items: center;
		position: relative;
		padding: 10px 10px 10px 12px;
		font-size: 28rpx;
		color: #656565;
	}

	.customer {
		text-align: right;
		margin-left: 60%;
	}

	view.text:before {
		position: absolute;
		display: block;
		content: ' ';
		left: -5px;
		width: 2px;
		height: 100%;
		background-color: #09bb07;
	}

	.line_flag {
		width: 8px;

		height: 15px;
		display: inline-block;
		background-color: #2f77fe;
		margin-left: -10px;
	}

	view.text text {
		margin-left: 10px;
		line-height: 18px;
		font-weight: bold;
	}

	.content {}

	.topview {}

	.bg {}

	.image {
		width: 100%;
		height: 90rpx;
	}

	.box {
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.boxview_item1 {
		display: flex;
		width: 100%;
		margin: 40rpx 0rpx;
	}

	.boxview_item1_list1 {
		width: 25%;
		text-align: center;
	}

	.imagestyle {
		width: 90rpx;
		height: 90rpx;
	}

	.message {
		width: 100%;
		padding: 15rpx 0rpx;
		box-sizing: border-box;
	}

	.messageview {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		padding: 20rpx 10rpx;
		box-sizing: border-box;
	}

	.bgview {
		background-size: cover;
	}

	.shuzi {
		font-size: 60rpx;
		margin-right: 6rpx;
	}

	.item_text {
		font-size: 30rpx;
	}

	.item_text1 {
		font-size: 40rpx;
	}

	.item {
		text-align: center;
		color: #FFFFFF;
		padding: 40rpx 0px;
		box-sizing: border-box;
	}

	.item1 {
		display: flex;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}

	.item1_box1 {
		width: 33%;
		font-size: 50rpx;
	}

	.item1_box2 {
		width: 34%;
		font-size: 50rpx;
		border-left: 4rpx solid #FFFFFF;
		border-right: 4rpx solid #FFFFFF;
	}

	.item1_box3 {
		width: 33%;
		font-size: 50rpx;
	}

	.item2 {
		display: flex;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}

	.item2_box1 {
		width: 33%;
		font-size: 30rpx;
	}

	.item2_box2 {
		width: 34%;
		font-size: 30rpx;
	}

	.item2_box3 {
		width: 33%;
		font-size: 30rpx;
	}

	.modal-box {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
	}

	.modal-body {
		position: relative;
	}

	.modal-content {
		/* width: 60%; */
		margin: 0 10% 0 10%;

		overflow: hidden;
		border-radius: 10rpx;
		margin-top: 20%;
		background-color: #fff;
		padding: 5%;
		opacity: 0.9;
	}

	.modal-contents {
		width: 60%;
		margin: 0 15% 0 15%;

		overflow: hidden;
		border-radius: 10rpx;
		margin-top: 15%;
		background-color: #fff;
		padding: 5%;
		opacity: 0.9;
	}

	.modal-content .modal-title {
		width: 100%;
		height: 40%;
		font-size: 20px;
		color: black;
		text-align: center;
	}

	.modal-content text {
		width: 100%;
		height: 40%;
		margin-top: 100px;
		font-size: 15px;
		line-height: 40rpx;
	}

	.top {
		margin-top: 15px;
		border-bottom: solid 1px #ebebeb;

	}

	.money,
	.customers {
		border-right: solid 1px #fff;

	}

	.gonggao {
		border-right: solid 1px #999999;
	}

	.weui-grids {
		border-top: 1rpx solid #fff;
		border-left: 1rpx solid #fff;

	}

	.weui-grid {
		border: 1rpx solid #fff;
		padding: 10px 10px;

	}

	.weui-grid__icon {
		width: 80rpx;
		height: 80rpx;

	}

	.all_prices {
		margin-top: 10rpx;
		font-size: 30px;
		color: rgb(248, 232, 2);
		font-weight: 700;
		text-align: center;
	}

	.all_reward {
		font-size: 28rpx;
		background: rgb(248, 232, 2);
		font-weight: 600;
		border: 1px solid rgb(248, 232, 2);
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
	}
</style>
