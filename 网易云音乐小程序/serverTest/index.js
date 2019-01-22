const express  = require('express');
const app = express();
const dir = '/v1';
var http = require('http');


app.get('/',(req,res)=>{
  res.end("hello Server")
})

//banner-获取
app.get(dir+"/banner",(req,res)=>{
    var cookie = req.get('Cookie')?req.get('Cookie'):(req.query.cookie?req.query.cookie:"");
    var data={
      "csrf_token": ""
    }
    //请求转发,注意这里将res传递出去，给统一接口回复前端
    createWebAPIRequest('/api/v2/banner/get',data,cookie,res,"GET")
})


function createWebAPIRequest(path,data,cookie,resq,method){
      console.log("111");
      method = method? method:"POST";
      //将要返回的数据
      var music_req = "";
      //向网易请求
      var http_client = http.request({
        hostname:"music.163.com",
        method:method,
        path:path,
        headers:{
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
          'Connection': 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': 'http://music.163.com',
          'Host': 'music.163.com',
          'Cookie': cookie,
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/602.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/602.1'
        },
      },(res)=>{
        console.log("KKK");
        console.log(res);
        //判断接收的数据
        res.on('error', function(err) {
          response.status(502).send('fetch error');
        });
        //设置返回编码
        res.setEncoding('utf8');
        if(res.statusCode != 200){
          //重新请求
          createWebAPIRequest(path,data,cookie,req,method);
          //重新请求 就不要在去执行后面的语句啦
          return
        }else{
          //流得到数据
          res.on('data',(chunk)=>{
              music_req += thunk;
          });
          //全部数据回来后的处理
          res.on('end',()=>{
            //数据是空的,再次请求一下
            if(music_req == ''){
              createWebAPIRequest(path,data,cookie,req,method);
              return;
            }
            //网易返回的数据有cookie
            if(res.headers['set-cookie']){
              cookie = res.headers['set-cookie'];
              //返回给前端带有cookie 的数据
              resq.send({
                code:200,
                i: JSON.parse(music_req),
              })
              return;
            }
            response.send(music_req);
          })
          http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
          http_client.end();
        }
      })
}







app.listen(3333,(e)=>{
  console.log("Server 开启在3333端口");
})
