<template>
	<view>
		<view class="box">
			<view class="box1">
				<image :src="imagesrc" mode="" class="imagestyle"></image>
			</view>
			<view class="buttonview">
				<button type="default" class="buttonstyle" @click="saveImageClcik()">保存图片到相册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc: ''
			}
		},
		methods: {
			saveImageClcik: function(e) {
				uni.downloadFile({
					url: this.imagesrc,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "图片已保存到相册",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},
		},
		
		mounted() {
			uni.request({
				url:'https://www.chuanglianmengpt.com/Api/User/tuiGuang',
				method:'GET',
				data: { id: '684'},
				success: (res) => {
					this.imagesrc = res.data;
				}
			})
		}
	}
</script>

<style lang="scss">
	.box {
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;

		.box1 {
			width: 100%;
			height: 600px;

			.imagestyle {
				width: 100%;
				height: 100%;
			}
		}

		.buttonview {
			width: 100%;
			height: 50px;
			margin-top: 20px;

			.buttonstyle {
				background-color: #f90004;
				color: #FFFFFF;
			}
		}
	}
</style>
