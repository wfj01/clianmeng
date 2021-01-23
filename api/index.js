import {
	baseURL
} from '../config'; //导入接口的前缀地址
import Base64 from "@/base64/base64.js"; 
export const myRequest = (options) => {
	console.log("options", options.data)
	if(options.data != undefined){
		options.data.userId = 684;
		console.log('udata',options.data)
		let base64 = new Base64();
		var udata1 = base64.encode(JSON.stringify(options.data));
		console.log("udata1", udata1);
	}
	else{
		udata1={}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url:baseURL+options.url, //接口地址：前缀+方法中传入的地址
			data: {data:udata1} || {}, //传递参数：传入的参数或者默认传递空集合 
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			header: options.header || {
				 "content-type": "application/x-www-form-urlencoded"
			},
			dataType : "application/json",
			success: (res) => {
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				if (res.statusCode != 200) {
					return uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				} else {
					// setTimeout(function(){
					// 	uni.showToast({
					// 		title: "获取数据成功",
					// 		icon: "none"
					// 	})
					// }, 1000)
				}
				// 如果不满足上述判断就输出数据
				resolve(res)
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败",
					icon: "none"
				})
				reject(err)
			}
		})
	})
}
