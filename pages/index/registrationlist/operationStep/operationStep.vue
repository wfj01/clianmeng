<template>
	<view>
		<view class="topbutton">
			<button type="primary" class="button1" @tap="gomachinePage()">请前往绑定商户SN</button>
			<button type="primary" class="button2" @tap="gologbidingPage()">查看商户登记记录</button>
			<button type="primary" class="button2" @tap="goCustomerPage()" v-if="info===60">商户进件</button>
		</view>
		<view class="middlebox">
			<view class="boximage1">
				<jyf-parser :html="content" ref="article"></jyf-parser>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";

	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				pos_id: "",
				pid: "",
				content: "",
				info: ""
			}
		},
		methods: {
			// 跳转到商户SN页面
			gomachinePage: function() {
				uni.navigateTo({
					url: '/pages/index/registrationlist/operationStep/machine/machine?pid='+this.pid
				})
			},

			// 跳转到商户登记记录页面
			gologbidingPage: function() {
				uni.navigateTo({
					url: '/pages/index/registrationlist/operationStep/logbidingPage/logbidingPage'
				})
			},

			//跳转到商户进件页面
			goCustomerPage: function() {
				uni.navigateTo({
					url: '/pages/index/registrationlist/operationStep/customer/customer'
				})
			},

			// 加载数据
			async loaddata() {
				const res = await this.$myRuquest({
					url: '/api/shop/detail',
					method: "POST",
					data: {
						pos_id: this.pos_id,
						pid: this.pid
					}
				})
				console.log(JSON.parse(res.data).data.content)
				this.content = JSON.parse(res.data).data.content
				this.info = JSON.parse(res.data).data.info
			}

		},

		onLoad(options) {
			console.log(options);
			console.log(JSON.parse(options.item).id, JSON.parse(options.item).pid)
			this.pos_id = JSON.parse(options.item).id
			this.pid = JSON.parse(options.item).pid
			console.log("1111", this.pos_id, this.pid)
			this.loaddata()
		}
	}
</script>

<style lang="scss">
	.topbutton {
		padding: 15rpx 25rpx;
		box-sizing: border-box;

		.button1 {
			margin: 20rpx;
		}

		.button2 {
			margin: 20rpx;
		}
	}

	.middlebox {
		.boximage1 {
			padding: 0rpx 10rpx;
			box-sizing: border-box;
			width: 100%;
		}
	}
</style>
