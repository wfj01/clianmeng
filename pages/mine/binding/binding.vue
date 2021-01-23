<template>
	<view>
		<view class="box1">
			<view class="box11">
				<view class="item">
					<view class="item_title">
						收款人姓名<text>*</text>
					</view>
					<view class="item_input">
						<input type="text" value="" placeholder="请输入姓名" class="inputstyle" v-model="name" @input="nameChange" />
					</view>
				</view>
				<view class="item">
					<view class="item_title">
						手机号<text>*</text>
					</view>
					<view class="item_input">
						<input type="text" value="" placeholder="请输入手机号" class="inputstyle" v-model="phoneNumber" @input="phoneNumberChange" />
					</view>
				</view>
				<view class="item">
					<view class="item_title">
						银行卡号<text>*</text>
					</view>
					<view class="item_input">
						<input type="text" value="" placeholder="请输入银行卡号" class="inputstyle" v-model="bankNumber" @input="bankNumberChange" />
					</view>
				</view>
				<view class="item">
					<view class="item_title">
						卡类型<text>*</text>
					</view>
					<view class="item_input">
						<input type="text" value="" disabled placeholder="请选择卡类型" class="inputstyle" v-model="cardType" @input="cardTypeChange" />
					</view>
				</view>
				<view class="item">
					<view class="item_title">
						支行名称<text>*</text>
					</view>
					<view class="item_input">
						<input type="text" value="" placeholder="请输入支行名称" class="inputstyle" v-model="bankName" @input="bankNameChange" />
					</view>
				</view>
				<view class="item">
					<view class="item_title1">
						提现须知
					</view>
					<view class="item_text">
						请在上方填写您的真实的个人信息并与身份证信息一致，信息出错或者不一致会导致您提现失败。我承诺您的资料只会在本平台用户提现打款时使用不会对外使用，请放心填写。
					</view>
				</view>
			</view>
			<view class="button " @tap="subitInfos()">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import util from '../../../utils/util.js'
	export default {
		data() {
			return {
				cardType: '',
				name: '',
				phoneNumber: '',
				bankName: '',
				bankNumber: ''
			}
		},
		methods: {
			// 获取名字
			nameChange: function(e) {
				this.name = e.detail.value
			},

			// 获取手机号
			phoneNumberChange: function(e) {
				this.phoneNumber = e.detail.value
			},

			// 获取银行卡号
			bankNumberChange: function(e) {
				this.bankNumber = e.detail.value
				var temp = util.bankCardAttribution(e.detail.value)
				console.log(temp)
				if (temp == Error) {
					temp.bankName = '';
					temp.cardTypeName = '';
				} else {
					this.cardType = temp.bankName + '-' + temp.cardTypeName
				}
			},

			// 银行名称
			bankNameChange: function(e) {
				this.bankName = e.detail.value
			},

			// 提交按钮事件
			async subitInfos() {
				var compare = /^(14[0-9]|13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
				var that = this;
				if (that.name.length === 0 || that.phoneNumber.length === 0) {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none',
						image: '',
						duration: 1000
					})
				} else if (that.phoneNumber.length !== 11) {
					uni.showToast({
						title: '手机号长度有误',
						icon: 'none',
						image: '',
						duration: 1000
					})
					return false;
				} else if (!compare.test(this.phoneNumber)) {
					uni.showToast({
						title: '请输入正确的手机号！',
						icon: 'none',
						image: '',
						duration: 1000
					})
					return false;
				} else if (!that.bankNumber) {
					uni.showToast({
						title: '银行卡号不能为空',
						icon: 'none',
						image: '',
						duration: 1000
					})
				} else if (!that.bankName) {
					uni.showToast({
						title: '支行名称不能为空',
						icon: 'none',
						image: '',
						duration: 1000
					})

				} else if (!that.cardType) {
					uni.showToast({
						title: '不支持该类型的银行卡，请更换',
						icon: 'none',
						image: '',
						duration: 1000
					})
				} else {
					uni.request({
						url: "https://www.chuanglianmengpt.com/Api/user/savebank",
						method: 'GET',
						data: {
							bank_user: that.name,
							bank_name: that.cardType,
							bank_address: that.bankName,
							bank_card: that.bankNumber,
							bank_tel: that.phoneNumber
						},
						success(res) {
							console.log(JSON.parse(res.data))
							wx.showToast({
								title: '提交成功！',
								icon: 'success',
								image: '',
								duration: 1000
							})
							if (res.data == 1) {
								setTimeout(function() {
									wx.switchTab({
										url: '../my/index'
									})
								}, 5000);

							} else {
								wx.showToast({
									title: '请重新提交！',
									icon: 'none',
									image: '',
									duration: 1000
								})

							}
						},
						fail() {

						}
					})

				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.box1 {
		width: 100%;
		height: 100%;
		padding: 10px 15px;
		box-sizing: border-box;

		.box11 {
			width: 100%;
			height: 100%;

			.item {
				.item_title {
					color: #333333;
					font-size: 15px;

					text {
						color: #cc0000;
					}
				}

				.item_title1 {
					color: #000000;
					font-size: 15px;
				}

				.item_text {
					color: #666666;
					font-size: 14px;
					margin-top: 5px;
					line-height: 20px;
				}

				.item_input {
					padding: 10px 0px 15px 0px;

					.inputstyle {
						line-height: 35px;
						height: 35px;
						border: 1px solid #F2F2F2;
						border-radius: 20px;
						padding: 5px 15px;
						box-sizing: border-box;
						box-shadow: 0px 0px 3px 1px #F2F2F2;
					}
				}
			}
		}

		.button {
			margin-top: 20px;
			background-color: #2f77fe;
			text-align: center;
			color: #FFFFFF;
			font-size: 15px;
			border-radius: 20px;
			line-height: 40px;
		}
	}
</style>
