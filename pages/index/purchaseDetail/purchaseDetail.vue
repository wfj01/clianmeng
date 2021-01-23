<template>
	<view>
		<view>
			<image :src="shop.images_address" class="slide-image"></image>

		</view>
		<view class="buys">
			<view class="goods_infor_top">
				<view class="goods_title">
					{{shop.shop_type}}
				</view>
				<view class="goods_price">
					<text>¥{{shop.price}}</text>
				</view>

			</view>
			<view class="goods_infor_pre">
				<view class="goods_infor_txt">

					<!-- 主容器 -->
					<view class="stepper">
						<!-- 减号 -->
						<text :class="minusStatus" @tap="bindMinus" style="margin-left:10px;">-</text>
						<!-- 数值 -->
						<input type="number" @change="bindManual" :value="num"></input>
						<!-- 加号 -->
						<text class="normal" @tap="bindPlus">+</text>
					</view>

				</view>

			</view>
			<view class="goods_deliver">
				*本产品由 创联盟 提供发货服务，包邮。
			</view>
		</view>
		<view class="goods_bottom" @tap="goaddressPage()">
			<navigator url="address/index">
				<view v-if="addressList.consignee" class="address">
					<text decode="true" space="true">{{addressList.consignee}}&nbsp;&nbsp; {{addressList.mobile}}</text>
					<text> {{addressList.address}}</text>
				</view>
				<view v-else>增加收货地址(包邮）</view>
			</navigator>
		</view>

		<view class="details">
			<text>-详情-</text>
			<image :src="shop.details" class="slide-image" mode="widthFix"></image>
		</view>
		<view class="null">

		</view>
		<view class="goods_bottom_btn">
			<view>
				<view class="goods_one">
					<view class="goods_car_num">
						总计：<text style="font-size:18px">{{sum}}</text>
					</view>
				</view>
				<view class="goods_half_half blue" @tap="tel_name" v-if="sessionid.tel==0">前往实名</view>
				<view class="goods_half_half blue" @tap="pay" v-else>缴纳押金<image src="/static/images/right.png"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// pages/my/buy.js
	var app = getApp();

	export default {
		data() {
			return {
				idtext: '',
				// input默认是1
				num: 1,
				// 使用data数据对象设置样式名
				minusStatus: 'disabled',
				addressList: [],
				sum: 0,
				sessionid: "",
				shop: ""
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			that.idtext = options.id;
			this.loaddata();
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			var arr = uni.getStorageSync('addressList') || []; // 更新数据  
			console.log(arr)
			this.addressList = arr;

		},

		methods: {
			// 加载数据
			async loaddata() {
				var that = this;
				const res = await that.$myRuquest({
					url: '/Api/index/goods?id=' + that.idtext
				})
				that.shop = JSON.parse(res.data);
				that.sum = (JSON.parse(res.data).price) * (this.num)
				console.log("res.data", that.shop)
			},
			pay: function() {
				var that = this;
				uni.requestPayment({
				    provider: 'wxpay',
				    orderInfo: 'orderInfo', //微信、支付宝订单数据
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				}); 
			},

			// 跳转到地址页面
			goaddressPage: function() {
				uni.navigateTo({
					url: '/pages/index/addressPage/addressPage'
				})
			},

			/* 点击减号 */
			bindMinus: function() {
				var num = this.num; // 如果大于1时，才可以减
				if (num > 1) {
					num--;
				} // 只有大于一件的时候，才能normal状态，否则disable状态
				var minusStatus = num <= 1 ? 'disabled' : 'normal'; // 将数值与状态写回
				this.num = num;
				this.minusStatus = minusStatus
				this.sumMoney();
			},

			/* 点击加号 */
			bindPlus: function() {
				var num = this.num; // 不作过多考虑自增1
				num++; // 只有大于一件的时候，才能normal状态，否则disable状态
				var minusStatus = num < 1 ? 'disabled' : 'normal'; // 将数值与状态写回
				this.num = num;
				this.minusStatus = minusStatus;
				this.sumMoney();
			},

			/* 输入框事件 */
			bindManual: function(e) {
				var num = e.detail.value; // 将数值与状态写回
				this, num = num;
				this.sumMoney();
			},
			// 计算所有商品的钱数
			sumMoney: function() {
				var that = this;
				var num = this.num;
				const goods = this.shop;
				var count = num * goods.price;
				console.log(count);
				that.sum = count
			}
		}
	};
</script>
<style>
	/* pages/my/buy.wxss */
	page {
		background-color: #fff;
	}

	.swiper-item {
		width: 100%;
	}

	.slide-image {
		width: 100%;
	}

	.goods_title {
		font-size: 22px;
		line-height: 20px;
		color: #333333;
		padding: 10px;
		height: 40px;

		position: relative;
	}

	.goods_infor_top {
		text-align: center;
	}

	.goods_price {
		padding: 10px;
		font-size: 20px;
		color: #333333;
	}

	.goods_old_price {
		margin-left: 10px;
		font-size: 12px;
		text-decoration: line-through;
		color: #535353;
	}

	.goods_deliver {
		padding: 10px;
		border-top: 1px solid #E5E5E5;
		font-size: 12px;
		color: #676767;
		text-align: center;

	}

	.goods_collect_img {
		width: 24px;
		height: 24px;
	}

	.goods_infor_pre {
		background-color: #FFF;
		padding: 10px;
		display: flex;
		justify-content: center;
	}

	.goods_infor_txt {
		font-size: 13px;
		line-height: 18px;
	}

	.goods_infor_brand {
		position: absolute;
		width: 40px;
		height: 40px;
		background-size: 40px 40px;
		background-repeat: no-repeat;
		background-position: center;
		left: 0px;
		top: 10px;
	}



	.goods_bottom {
		width: 80%;
		padding: 10px;
		border-top: 1px solid #E5E5E5;
		font-size: 14px;
		color: #676767;
		background-color: #e9e9e9;
		margin-top: 20px;
		margin-left: 8%;
		border-radius: 5px;
	}

	.details {
		color: #676767;
		background-color: #fff;
		margin-top: 10px;
		font-size: 18px;
		width: 100%;
		text-align: center;
	}

	.details text {
		padding: 10px;
	}

	.details image {
		width: 100%;
		margin-top: 10px;
	}

	.address {
		height: 50px;
	}

	.goods_bottom text {
		width: 100%;
		float: left;
	}

	.goods_bottom_btn {
		position: fixed;
		width: 94%;
		bottom: 0;
		height: 40px;
		z-index: 99;
		background-color: #2f77fe;
		border-top: 1px solid #2f77fe;
		box-shadow: 0px 0 5px #2f77fe;
		margin-left: 3%;
		border-radius: 30px;
		margin-bottom: 10rpx;
	}

	.goods_one {
		width: 50%;
		float: left;
		height: 40px;
		border-right: 1px solid #e9e9e9;
	}

	.goods_half_half {
		width: 49%;
		float: left;
		font-size: 16px;
		line-height: 90rpx;
		text-align: center;
		color: #FFF;
	}

	.goods_half_half image {
		width: 15px;
		height: 15px;
	}

	.goods_car_num {
		width: 100%;
		margin: 0 auto;
		font-size: 16px;
		background-size: 26px;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		height: 90rpx;
		line-height: 90rpx;
		display: inline-block;
		font-size: 14px;
		color: #fff;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
	}

	.goods_one {}

	/*主容器*/
	.stepper {
		width: 150px;
		height: 30px;
		/*给主容器设一个边框*/
		position: relative;
		align-items: center;
		border-radius: 30px;

		background-image: url("http://qfj.91sfb.com/Public/image/buy-background.png");
		background-size: cover;
	}

	/*加号和减号*/
	.stepper text {
		border: 1px solid #fff;
		height: 26px;
		width: 25px;
		line-height: 26px;
		text-align: center;
		float: left;
		border-radius: 50%;

	}

	/*数值*/
	.stepper input {
		width: 75px;
		line-height: 26px;
		float: left;
		height: 25px;
		margin: 0 auto;
		text-align: center;
		font-size: 12px;
		color: #fff;
		/*给中间的input设置左右边框即可
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
	  border: 1px solid #ccc;
		*/
	}

	/*普通样式*/
	.stepper .normal {
		color: #fff;
	}

	/*禁用样式*/
	.stepper .disabled {
		color: #fff;

	}

	.buys {
		background-color: #fff;
		width: 84%;
		margin-left: 8%;
		border-radius: 10px;
		box-shadow: 0px 0 5px #bebebe;
		border: solid 1px #ebebeb;
		opacity: 0.8;
		z-index: 1000;
		margin-top: -50px;
	}

	.null {
		height: 40px;
	}
</style>
