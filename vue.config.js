module.exports = {
    lintOnSave:false,//禁用eslint

    devServer:{
        proxy: {
            "/api": {
                // 转发目标服务器的地址
              target: "http://39.98.123.211",
            //   是否把路径当中的/api去掉
            //   pathRewrite: {"^/api" : ""}//要不要去掉/api，要看接口路径里面有没有//配置文件动了，要重启项目
            }
          }
    }
} 