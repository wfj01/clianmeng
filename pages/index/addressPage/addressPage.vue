<template>
	<view>
		<form @submit="saveAddress">

			<view class="weui-cells weui-cells_after-title">

				<view class="weui-cell weui-cell_input">

					<view class="weui-cell__hd">

						<view class="weui-label">收货人</view>

					</view>

					<view class="weui-cell__bd">

						<input class="weui-input" name="consignee" placeholder="请输入收货人真实姓名"></input>

					</view>

				</view>

				<view class="weui-cell weui-cell_input">

					<view class="weui-cell__hd">

						<view class="weui-label">手机号</view>

					</view>

					<view class="weui-cell__bd">

						<input class="weui-input" name="mobile" placeholder="请输入收货人手机号"></input>

					</view>

				</view>


			</view>


			<view class="weui-cells weui-cells_after-title">

				<view class="weui-cell weui-cell_select">

					<view class="weui-cell__hd weui-cell__hd_in-select-after">

						<view class="weui-label">省份</view>

					</view>

					<view class="weui-cell__bd">

						<picker @change="bindProvinceNameChange" :value="provinceIndex" :range="provinceNames">

							<view class="weui-select weui-select_in-select-after">{{provinceNames[provinceIndex]}}</view>

							<input name="provinceName" hidden="true" :value="provinceNames[provinceIndex]"></input>

						</picker>

					</view>

				</view>

				<view class="weui-cell weui-cell_select">

					<view class="weui-cell__hd weui-cell__hd_in-select-after">

						<view class="weui-label">城市</view>

					</view>

					<view class="weui-cell__bd">

						<picker @change="bindCityNameChange" :value="cityIndex" :range="cityNames">

							<view class="weui-select weui-select_in-select-after" name="city_name">{{cityNames[cityIndex]}}</view>



							<input name="cityName" hidden="true" :value="cityNames[cityIndex]"></input>

						</picker>

					</view>

				</view>

				<view class="weui-cell weui-cell_select">

					<view class="weui-cell__hd weui-cell__hd_in-select-after">

						<view class="weui-label">区县</view>

					</view>

					<view class="weui-cell__bd">

						<picker @change="bindCountyNameChange" :value="countyIndex" :range="countyNames">

							<view class="weui-select weui-select_in-select-after">{{countyNames[countyIndex]}}</view>

							<input name="countyName" hidden="true" :value="countyNames[countyIndex]"></input>

						</picker>

					</view>

				</view>

				<view class="weui-cell weui-cell_input">

					<view class="weui-cell__hd">

						<view class="weui-label">详细地址</view>

					</view>

					<view class="weui-cell__bd">

						<input class="weui-input" name="address" placeholder="请输入收货人详细地址"></input>

					</view>

				</view>

			</view>
			<view class="buttonview">
				<button type="primary" class="button" form-type="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	// pages/my/address/index.js
	var area = require("../../../utils/area.js");
	var areaInfo = []; //所有省市区县数据
	//所有省市区县数据
	var provinces = []; //省
	//省
	var provinceNames = []; //省名称
	//省名称
	var citys = []; //城市
	//城市
	var cityNames = []; //城市名称
	//城市名称
	var countys = []; //区县
	//区县
	var countyNames = []; //区县名称
	//区县名称
	var value = [0, 0, 0]; //数据位置下标
	//数据位置下标
	var addressList = null;

	export default {
		data() {
			return {
				codename: '获取验证码',
				transportIndex: 0,
				provinceIndex: 0,
				//省份
				cityIndex: 0,
				//城市
				countyIndex: 0, //区县
				provinceNames: "",
				citys: "",
				cityNames: "",
				countys: "",
				countyNames: "",
				value: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;
			area.getAreaInfo(function(arr) {
				areaInfo = arr; //获取省份数据

				that.getProvinceData();
			});
		},
		methods: {
			// 获取省份数据
			getProvinceData: function() {
				var that = this;
				var s;
				provinces = [];
				provinceNames = [];
				var num = 0;

				for (var i = 0; i < areaInfo.length; i++) {
					s = areaInfo[i];

					if (s.di == "00" && s.xian == "00") {
						provinces[num] = s;
						provinceNames[num] = s.name;
						num++;
					}
				}
				this.provinceNames = provinceNames
				that.getCityArr();
				that.getCountyInfo();
			},
			// 获取城市数据
			getCityArr: function(count = 0) {
				var c;
				citys = [];
				cityNames = [];
				var num = 0;

				for (var i = 0; i < areaInfo.length; i++) {
					c = areaInfo[i];

					if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
						citys[num] = c;
						cityNames[num] = c.name;
						num++;
					}
				}

				if (citys.length == 0) {
					citys[0] = {
						name: ''
					};
					cityNames[0] = {
						name: ''
					};
				}

				var that = this;
				that.citys = citys;
				that.cityNames = cityNames
				console.log('cityNames:' + cityNames);
				that.getCountyInfo(count, 0);
			},
			// 获取区县数据
			getCountyInfo: function(column0 = 0, column1 = 0) {
				var c;
				countys = [];
				countyNames = [];
				var num = 0;

				for (var i = 0; i < areaInfo.length; i++) {
					c = areaInfo[i];

					if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
						countys[num] = c;
						countyNames[num] = c.name;
						num++;
					}
				}

				if (countys.length == 0) {
					countys[0] = {
						name: ''
					};
					countyNames[0] = {
						name: ''
					};
				}

				console.log('countyNames:' + countyNames);
				var that = this; // value = [column0, column1, 0];
				that.countys = countys;
				that.countyNames = countyNames;
			},
			bindTransportDayChange: function(e) {
				this.transportIndex = e.detail.value
			},
			bindProvinceNameChange: function(e) {
				var that = this;
				var val = e.detail.value;
				that.getCityArr(val); //获取地级市数据

				that.getCountyInfo(val, 0); //获取区县数据

				value = [val, 0, 0];
				this.provinceIndex = e.detail.value;
				this.cityIndex = 0;
				this.countyIndex = 0;
				this.value = value;
			},
			bindCityNameChange: function(e) {
				var that = this;
				var val = e.detail.value;
				that.getCountyInfo(value[0], val); //获取区县数据

				value = [value[0], val, 0];
				this.cityIndex = e.detail.value;
				this.countyIndex = 0;
				this.value = value;
			},
			bindCountyNameChange: function(e) {
				var that = this;
				console.log('picker county 发生选择改变，携带值为', e.detail.value);
				this.countyIndex = e.detail.value

			},
			saveAddress: function(e) {
				var consignee = e.detail.value.consignee;
				var mobile = e.detail.value.mobile;
				var transportDay = e.detail.value.transportDay;
				var provinceName = e.detail.value.provinceName;
				var cityName = e.detail.value.cityName;
				var countyName = e.detail.value.countyName;
				var address = e.detail.value.address;
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;

				if (consignee == "") {
					uni.showToast({
						title: '收货人不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (mobile == '') {
					uni.showToast({
						title: '手机号码不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!myreg.test(mobile)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!provinceName || !cityName || !countyName) {
					uni.showToast({
						title: '地区不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!address) {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				console.log("444444444", consignee + mobile + provinceName + "," + cityName + "," + countyName + "," + address); //输出该文本 

				var arr = uni.getStorageSync('addressList') || [];
				console.log("arr,{}", arr);
				addressList = {
					consignee: consignee,
					mobile: mobile,
					address: provinceName + cityName + countyName + address
				}; //arr.push(addressList);

				uni.setStorageSync('addressList', addressList);
				uni.navigateBack({});
			}
		}
	};
</script>
<style>
	@import "../../../utils/weui.css";

	.buttonview {
		margin-top: 60rpx;
		padding: 0px 30rpx;
		box-sizing: border-box;
	}

	.button {
		width: 100%;
	}

	.weui-label {
		width: 180rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #3d3d3d;
	}

	.weui-select {
		font-size: 34rpx;
		color: #545454;
	}

	.weui-input {
		font-size: 34rpx;
		color: #545454;
	}

	.weui-cell {
		line-height: 100rpx;
		left: 0px;
	}

	.weui-cell__hd_in-select-after {
		padding: 0;
	}
</style>
