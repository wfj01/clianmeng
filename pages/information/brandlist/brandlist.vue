<template>
	<view>
		<!-- 下划线不设置滑动效果 -->
		<ms-tabs :list="list2" v-model="active2" lineColor="#007AFF" itemColor="#007AFF"></ms-tabs>
		<view class="topbox">
			
		</view>
		<view class="middlelist" >
			<view class="listbox">
				<view class="listitem" v-for="(item,index) in mydata" :key="index" @click="godetailpage(item.id)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list2: [],
				mydata: [],
				active2: 0
			}
		},
		methods: {
			
			// 跳转到详情页面
			godetailpage(id){
				uni.navigateTo({
					url: "/pages/information/newsdetail/newsdetail?id=" + id,
				})
			},
			
			//顶部切换栏目
			loadTab:function(){
				uni.request({
					url:"https://www.chuanglianmengpt.com/Api/index/sort",
					method:'GET',
					data: {},
					success: (res) => {
						console.log("res",res.data);
						this.list2 = res.data
						this.getcontent(this.list2[0].id)
					}
				})
			},
			
			// 获取数据
			async getcontent(e){
				const res = await this.$myRuquest({
					url:'/api/index/getcontent',
					data:{
						pid :e
					},
					method:'POST'
				})
				console.log('res',JSON.parse(res.data))
				this.mydata = JSON.parse(res.data).data
			},
		},
		mounted() {
			this.loadTab();
		},
		watch: {
			active2() {
				console.log(this.active2) // 0
				const id = this.list2[this.active2].id;
				this.getcontent(id)
			}
		}
	}
</script>

<style lang="scss">
	.topbox{
		height: 100rpx;
	}
	.middlelist {
		padding: 6px;
		box-sizing: border-box;

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
</style>
