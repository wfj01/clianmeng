<template>
	<view>
		<view class="">
			<!-- 下划线不设置滑动效果 -->
			<ms-tabs :list="list2" v-model="active2" lineColor="#007AFF" itemColor="#007AFF"></ms-tabs>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list2: [{
					title: '付款记录'
				}, {
					title: '提现记录'
				}],
				active2: 0,
				datas:"",
				category:'',
			}
		},
		methods: {
			async loaddata() {
				const res = await this.$myRuquest({
					url: "/Api/pay/order",
					method: 'GET',
				})
				console.log(JSON.parse(res.data))
				this.datas = JSON.parse(res.data).order;
				this.category = JSON.parse(res.data).category;
			}
		},
		mounted() {
			this.loaddata()
		},
		watch: {
			active2() {
				console.log(this.active2) // 0
			}
		}
	}
</script>

<style>

</style>
