<template>
	<view>
		<view class="container">
		 <view class="art-title">{{art.title}}</view>
		  <view class='push_time'>时间:{{art.createtime}}</view>
		    <view class="top"></view>
		    <view class="art-content">
		     <text>{{art.content}}</text>
		    </view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				art:{}
			}
		},
		methods: {
			
			async loaddata(id){
				this.art = {};
				const res = await this.$myRuquest({
					url:'/api/news/getnews',
					data:{
						id: id
					},
					method:'POST'
				})
				console.log(JSON.parse(res.data))
				this.art = JSON.parse(res.data).data
			}
			
		},
		
		onLoad(options) {
			console.log(options.id)
			this.loaddata(options.id)
		}
	}
</script>

<style>
page{
  background-color: #fff;
}
.art-header{
    margin-top: 10px;
    width: 100%;
    height: 219px;
    color: #FFF;
}
.push_time{
   text-align: center;
    font-size: 12px;
    padding-top: 14px;
    color: #646363;
}
.push_time text{
  margin-left: 10px;
}
.art-img{
    width: 100%;
    height: 219px;
}

.art-title{
   text-align: center;
    font-size: 16px;
    padding-top: 16px;
}

.art-source {
    position: absolute;
    bottom: 8px;
    font-size: 30rpx;
    right: 8px;   
}

.art-content{
    font-size: 30rpx;
    color: #616466;
    padding: 30rpx 40rpx;
	box-sizing: border-box;
    background-color: #FFF;
    line-height: 1.5;
}
.top{
  border-bottom:solid 1px #ebebeb;
  margin-top: 20rpx;
}
</style>
