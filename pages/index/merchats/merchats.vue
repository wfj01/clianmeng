<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 加载数据
			async loaddata(){
				const res = await this.$myRuquest({
					url:"/api/loan/get_merchats",
					method:"POST",
					data:{
						page : 1
					}
				})
				console.log(JSON.parse(res.data))
			}
		},
		mounted() {
			this.loaddata()
		}
	}
</script>

<style>

</style>
