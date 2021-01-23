<template>
	<view>
		<view class="topview">
			<view class="bgimageview" :style="{backgroundImage:'url('+imagesrc+')'}">
				<view class="item1">
					<text class="item1_text1">0</text>
					<text class="item1_text2">总收益/元</text>
				</view>
				<view class="item2">
					<view class="item2_list1">
						<view class="item2_listitem1">
							0
						</view>
						<view class="item2_listitem2">
							可提现金额/元
						</view>
					</view>
					<view class="item2_list2">
						<view class="item2_listitem3">
							0
						</view>
						<view class="item2_listitem4">
							已提现金额/元
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="inputview">
			<view class="inputstyle">
				<input type="text" value="" class="inputa" placeholder="请输入提现金额" />
			</view>
		</view>
		<view class="">
			<view class='withdraw-note'>提现须知</view>
			<view class='bank-reminder'><text>*如果未绑定提现帐号，请先绑定提现帐号。\n*可提现金额要满足100元才可提现\n*税点需要扣除8%；\n*每笔提现手续费2元。\n*如有延迟，敬请谅解或者联系客服</text>
			</view>
		</view>
		<view class="middlebox">
			<view class="middlebox_box" v-for="(item,index) in itemlist" :key="index">
				<view class="itembox1">
					<view class=" itembox1_left">
						<image class="imagesrc" :src="item.images_address" mode=""></image>
						<view class="imagetext">
							{{item.title}}
						</view>
					</view>
					<view class=" itembox1_right">
						{{item.reward_money}}
					</view>
				</view>
			</view>
		</view>

		<view class="bottomview">
			<view class="bottom_button" @click="gobindingPage()" v-if="info === 1">
				<button type="primary" style="border-radius: 20px;">确定</button>
			</view>
			<view class="bottom_button" @click="gobindingPage()" v-else>
				<button type="primary" style="border-radius: 20px;">绑定提现账号</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc: "../../static/image/banner-tixian.png",
				itemlist:[],
				info:'',
				money:''
			}
		},
		methods: {
			// 绑定提现页面
			gobindingPage:function(){
				uni.navigateTo({
					url:'/pages/mine/binding/binding'
				})
			},
			
			// 加载数据
			async loadata(){
				const res = await this.$myRuquest({
					url:'/api/reward/reward_money',
					method:'POST',
					data:{}
				})
				console.log("res",JSON.parse(res.data).data.pos_category);
				this.itemlist = JSON.parse(res.data).data.pos_category;
				this.info = JSON.parse(res.data).data.info
			}
		},
		onLoad() {
			this.loadata()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.topview {
		.bgimageview {
			background-size: cover;
			color: #FFFFFF;
			padding: 15rpx 15rpx 30rpx 15rpx;
			box-sizing: border-box;

			.item1 {
				text-align: center;
				line-height: 100rpx;
				padding: 20rpx 0rpx;
				box-sizing: border-box;

				.item1_text1 {
					font-size: 60rpx;
					margin-right: 10rpx;
				}

				.item1_text2 {
					font-size: 30rpx;
				}
			}

			.item2 {
				display: flex;

				.item2_list1 {
					width: 50%;
					text-align: center;

					.item2_listitem1 {
						font-size: 50rpx;
					}

					.item2_listitem2 {
						font-size: 30rpx;
					}
				}

				.item2_list2 {
					text-align: center;
					width: 50%;

					.item2_listitem3 {
						font-size: 50rpx;
					}

					.item2_listitem4 {
						font-size: 30rpx;
					}
				}
			}

		}
	}

	.inputview {
		margin-top: 20rpx;

		.inputstyle {
			padding: 18rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.inputa {}
		}
	}

	.withdraw-note {
		font-size: 32rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.bank-reminder {
		font-size: 28rpx;
		margin-left: 30rpx;
		color: #8a8a8a;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.middlebox {
		.middlebox_box {
			padding: 20rpx;
			box-sizing: border-box;

			.itembox1 {
				display: flex;
				justify-content: space-between;
				background-color: #FFFFFF;
				padding: 25rpx;
				box-sizing: border-box;
				border-radius: 30rpx;

				.itembox1_left {
					width: 50%;
					display: flex;
					justify-content: flex-start;

					.imagesrc {
						height: 90rpx;
						width: 90rpx;
					}

					.imagetext {
						color: #333333;
						font-size: 35rpx;
						padding: 0 0 8rpx 0;
						line-height: 90rpx;
						font-weight: 700;
						margin-left: 20rpx;
					}
				}

				.itembox1_right {
					width: 50%;
					color: #333333;
					line-height: 90rpx;
					font-size: 35rpx;
					padding: 0 0 8rpx 0;
					font-weight: 700;
					float: right;
					margin-left: 30rpx;
				}
			}
		}
	}

	.bottomview {
		.bottom_button {
			position: absolute;
			bottom: 0px;
			padding:20rpx;
			box-sizing: border-box;
			width: 100%;
			border-radius: 30rpx;
		}
	}
</style>
