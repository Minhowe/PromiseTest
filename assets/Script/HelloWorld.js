cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        var p = new Promise(function(resolve, reject){
            // 做一些异步操作
            setTimeout(() => {
                console.log("执行完成");
                resolve("随便什么数据");
            }, 2000);
        });

        function runAsync1() {
            var p = new Promise(function(resolve, reject){
                // 做一些异步操作
                setTimeout(() => {
                    console.log("异步任务1执行完成");
                    resolve("随便什么数据1");
                }, 1000);
            });
            return p;
        }

        function runAsync2(){
            var p = new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(() =>{
                    console.log('异步任务2执行完成');
                    resolve('随便什么数据2');
                }, 2000);
            });
            return p;            
        }

        function runAsync3(){
            var p = new Promise(function(resolve, reject){
                //做一些异步操作
                setTimeout(()=>{
                    console.log('异步任务3执行完成');
                    resolve('随便什么数据3');
                }, 2000);
            });
            return p;            
        }
        // 链式操作的用法
        runAsync1()
        .then(function(data){
            console.log(data);
            return runAsync2();
        })
        .then(function(data){
            console.log(data);
            return "直接返回数据";
        })
        .then(function(data){
            console.log(data);
        });

        // reject的用法
        function getNumber() {
            var p = new Promise(function(resolve, reject) {
                // 做一些异步操作
                setTimeout(() => {
                    var num = Math.ceil(Math.random()* 10);
                    if (num <= 5) {
                        resolve(num);
                    }else{
                        reject("数字太大了");
                    }
                }, 2000);
            })
            return p;
        }

        getNumber()
        .then(
            function(data){
                console.log("resolved");
                console.log(data);
            },
            function(reason, data) {
                console.log("rejected");
                console.log(reason);
            }
        );
        
        // catch的用法
        getNumber()
        .then(function(data){
            console.log("resolved");
            console.log(data);
            console.log(somedata); //此处的somedata未定义
        })
        .catch(function(reason){
            console.log("rejected");
            console.log(reason);
        });

        // all用法
        Promise
        .all([runAsync1(), runAsync2(), runAsync3()])
        .then(function(results){
            console.log(results);
        });

        // Race的用法
        Promise
        .race([runAsync1(), runAsync2(), runAsync3()])
        .then(function(results){
            console.log(results);
        });

        // 请求某个图片资源
        function requestImg(){
            var p = new Promise(function(resolve, reject){
                var img = new Image();
                img.onload = function() {
                    resolve(img);
                }
                img.src = "XXXXXX";

            });
            return p;
        }
        // 延时函数，用于给请求计时
        function timeout() {
            var p = new Promise(function(resolve, reject) {
                setTimeout(() => {
                    reject("图片请求超时");
                }, 5000);
            })
            return p;
        }

        Promise
        .race([requestImg(), timeout()])
        .then(function(results){
            console.log(results);
        })
        .catch(function(reason){
            console.log(reason);
        });
    },


    // called every frame
    update: function (dt) {

    },
});
