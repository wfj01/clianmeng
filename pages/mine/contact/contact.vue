<template>
	<view>
		<view class="box">
			<view class="box1">
				<image :src="imagesrc" mode="" class="imagestyle"></image>
				<view class="buttonview">
					<button type="default" class="button">{{buttontext}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagesrc:'https://www.chuanglianmengpt.com/Public/image/contact.jpg',
				buttontext:'在线客服'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.box {
		.box1 {
			width: 100%;
			text-align: center;
			padding: 15px 0px;
			box-sizing: border-box;

			.imagestyle {
				width: 55%;
				height: 200px;
			}

			.buttonview {
				margin-top: 10px;
				width: 100%;
				padding: 5px 15px;
				box-sizing: border-box;
				.button {
					background-color: #F2F2F2;
					color: #333333;
				}
			}
		}
	}
</style>
