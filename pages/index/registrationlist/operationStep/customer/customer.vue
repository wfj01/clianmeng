<template>
	<view>
		<loading :hidden="hidden">
			上传中...
		</loading>
		<view class="ID-mian">
			<view class="card-name">商户进件时,如遇到问题，可以到个人中心（点击联系客服），获取帮助！</view>
			<view class="card-cont">
				<view class="card-list" @tap="frontimage">
					<image :src="photos?photos:src" id="photos" @tap="frontimage" mode="aspectFit"></image>
					<view>身份证正面照</view>
				</view>
				<view class="card-list" @tap="frontimage">
					<image :src="photos2?photos2:src" id="photos2" @tap="frontimage" mode="aspectFit"></image>
					<view>身份证反面照</view>
				</view>
				<view class="card-list">
					<image :src="photos3?photos3:src" id="photos3" @tap="frontimage" mode="aspectFit"></image>
					<view>身份验证照</view>
				</view>

			</view>
			<view class="card-cont">
				<view class="card-list">
					<image :src="photos4?photos4:src" id="photos4" @tap="frontimage" mode="aspectFit"></image>
					<view>银行卡正面</view>
				</view>
				<view class="card-list">
					<image :src="photos5?photos5:src" id="photos5" @tap="frontimage" mode="aspectFit"></image>
					<view>银行卡反面</view>
				</view>
			</view>
		</view>


		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="请输入绑定商户的姓名" @input="getname"></input>
		</view>

		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="请输入使用用户手机号" @input="gettel"></input>
		</view>

		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="请输入需要绑定的sn号" @input="getSn"></input>
		</view>

		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="请输入储蓄卡的开户行" @input="bankFun"></input>
		</view>
		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="请输入机器使用地区（具体到市区）" @input="getAdress"></input>
		</view>
		<view class="enroll-item">
			<input class="item-content" type="text" placeholder="真实店铺名称，(如果没有，可选填）" @input="shopName"></input>
		</view>
		<button class="area" @tap="setmore">确认提交</button>
	</view>
</template>

<script>
	// // pages/index/re/customer.js
	// var app = getApp(),
	// 	h = require("../../../../utils/api.js"); 
	export default {
		data() {
			return {
				tempFilePaths: '',
				hidden: true,
				//true
				buthidden: false,
				//false
				sourceType: ['album', 'camera'],
				src: require('@/static/image/upload1.png'),
				show: false,
				pos_id: "",
				FilePaths: "",
				photos: "",
				photos2: "",
				photos3: "",
				photos4: "",
				photos5: "",
				number: "",
				name: "",
				tel: "",
				city: "",
				bank: "",
				shop_name: ""
			};
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			console.log(options);
			that.pos_id = options.pos_id
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		methods: {
			frontimage: function(e) {
				var type = e.currentTarget.id;
				console.log(type);
				var _this = this;
				var Type = _this.sourceType;
				uni.chooseImage({
					count: 1,
					// 默认9 
					sizeType: ['original', 'compressed'],
					// 可以指定是原图还是压缩图，默认二者都有
					sourceType: Type,
					// 可以指定来源是相册还是相机，默认二者都有 
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
						console.log(res);

						_this.FilePaths = res.tempFilePaths

						_this.upLoadImg(res.tempFilePaths, type);
					}
				});
			},
			upLoadImg: function(list, type) {
				var that = this;
				this.upload(that, list, type);
			},
			//多张图片上传
			upload: function(page, path, type) {
				var that = this;
				var curImgList = []; // for (var i = 0; i < path.length; i++) {

				uni.showToast({
					icon: "loading",
					title: "正在上传"
				}), uni.uploadFile({
					url: "https://www.chuanglianmengpt.com/Api/loan/upliadImg",
					//接口处理
					filePath: path[0],
					name: 'files',
					header: {
						"Content-Type": "multipart/form-data"
					},
					formData: {
						user_id: '1'
					},
					success: function(res) {
						var imgdata = JSON.parse(res.data); //从json对象中创建JavaScript对象

						if (type == 'photos') {
							that.photos = imgdata.savename
						} else if (type == 'photos2') {
							that.photos2 = imgdata.savename
						} else if (type == 'photos3') {
							that.photos3 = imgdata.savename
						} else if (type == 'photos4') {
							that.photos4 = imgdata.savename
						} else if (type == 'photos5') {
							that.photos5 = imgdata.savename
						}

						if (res.data == "F") {
							uni.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false
							});
							return;
						}

						var data = res.data; // page.setData({  //上传成功修改显示头像

					},
					fail: function(e) {
						uni.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						});
					},
					complete: function() {
						uni.hideToast(); //隐藏Toast
					}
				}); // }
			},
			//获取sn号
			getSn: function(e) {
				this.number = e.detail.value
			},
			getname: function(e) {
				this.name = e.detail.value
			},
			gettel: function(e) {
				this.tel = e.detail.value
			},
			getAdress: function(e) {
				this.city = e.detail.value
			},
			bankFun: function(e) {
				this.bank = e.detail.value
			},
			shopName: function(e) {
				this.shop_name = e.detail.value
			},

			/**
			 * 提交sn号
			 */
			async setmore(e) {
				var that = this;
				var pos_id = that.pos_id;
				var number = that.number;
				var name = that.name;
				var tel = that.tel;
				var photos = that.photos;
				var photos2 = that.photos2;
				var photos3 = that.photos3;
				var photos4 = that.photos4;
				var photos5 = that.photos5;
				var city = that.city;
				var bank = that.bank;
				var shop_name = that.shop_name;
				var myreg = /^1\d{10}$/;

				if (photos == '') {
					uni.showToast({
						title: '身份证正面照不能为空！',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
				} else if (photos2 == '') {
					uni.showToast({
						title: '身份证反面照不能为空！',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
				} else if (photos3 == '') {
					uni.showToast({
						title: '手持身份证不能为空！',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
				} else if (photos4 == '') {
					uni.showToast({
						title: '银行卡面照不能为空！',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
				} else if (photos5 == '') {
					uni.showToast({
						title: '银行卡反面照不能为空！',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
				} else if (name == '') {
					uni.showToast({
						title: '请输入用户名',
						icon: 'succes',
						duration: 1000,
						mask: true
					});
					return false;
				} else if (tel.length != 11) {
					uni.showToast({
						title: '手机号长度有误！',
						icon: 'success',
						duration: 1500
					});
					return false;
				}

				if (!myreg.test(tel)) {
					uni.showToast({
						title: '手机号有误！',
						icon: 'success',
						duration: 1500
					});
					return false;
				} else if (!number) {
					uni.showToast({
						title: '请输入sn号',
						icon: 'none',
						image: '',
						duration: 1000
					});
					return false;
				} else if (!bank) {
					uni.showToast({
						title: '储蓄卡开户行不能为空',
						icon: 'none',
						image: '',
						duration: 1000
					});
					return false;
				} else if (!city) {
					uni.showToast({
						title: '机器所在使用城市不能为空！',
						icon: 'none',
						image: '',
						duration: 1000
					});
					return false;
				}
				console.log(pos_id);
				const res = await this.$myRuquest({
					url: '/api/loan/fetchmachine',
					method: "POST",
					data: {
						'pos_id': pos_id,
						'number': number,
						'tel': tel,
						'name': name,
						'photos': photos,
						"photos2": photos2,
						'photos3': photos3,
						'photos4': photos4,
						'photos5': photos5,
						'city': city,
						'bank': bank,
						'shop_name': shop_name
					}
				})
				if (res.data == 1) {
					uni.showToast({
						title: '修改成功！',
						icon: 'SUCCESS',
						image: '',
						duration: 1000,
						success: function() {
							setTimeout(function() {
								uni.switchTab({
									url: '../../index/index'
								});
							}, 2000); //延迟时间
						}
					});
				} else if (res.data == -1) {
					uni.showToast({
						title: '该sn资料已存在，请到个人中心修改！',
						icon: 'none',
						image: '',
						duration: 1000
					});
				} else if (res.data == 2) {
					uni.showToast({
						title: '该sn已绑定，请检查后在绑定！',
						icon: 'none',
						image: '',
						duration: 1000
					});
				} else {
					uni.showToast({
						title: '请重新提交！',
						icon: 'none',
						image: '',
						duration: 1000
					});
				}
			}
		}
	};
</script>
<style>
	@import "../../../../../utils/customer.css";
</style>
