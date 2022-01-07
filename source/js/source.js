var dicx,dicy,dicz;
var snow,rain;
snow = rain = -1;
dicx = dicy = dicz = 0;
let speed = 1;
//创建场景
var scene = new THREE.Scene();
/**
 * 相机设置
 */
var width = window.innerWidth-16; //窗口宽度
var height = window.innerHeight-20; //窗口高度
var k = width / height; //窗口宽高比
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(292, 109, 268);//设置相机位置

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0x666666, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中

function fish(path,num){
    var textureTree = new THREE.TextureLoader().load(path);
    console.log(path);
    var group = new THREE.Group();

    for (let i = 0; i < num; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
            map:textureTree,//设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        scene.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在空间中随机分布
        sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2)
        group.add(sprite);
    }
    scene.add(group);
    return group;
}

var group00 = fish("./img/rain.png",1000);
var group01 = fish("./img/f1.png",100);
var group02 = fish("./img/f2.png",100);
var group03 = fish("./img/f3.png",100);
var group04 = fish("./img/x01.png",1000);
/**
 * 精灵创建下雨效果
 */
// // 加载雨滴理贴图
// // var textureTree = new THREE.TextureLoader().load("img/rain.png");
// var textureTree = new THREE.TextureLoader().load("img/f1.png");
// // 创建一个组表示所有的雨滴
// var group = new THREE.Group();
// // 批量创建雨滴精灵模型
// for (let i = 0; i < 400; i++) {
// 	var spriteMaterial = new THREE.SpriteMaterial({
// 	  map:textureTree,//设置精灵纹理贴图
// 	});
// 	// 创建精灵模型对象
// 	var sprite = new THREE.Sprite(spriteMaterial);
// 	scene.add(sprite);
// 	// 控制精灵大小,
// 	sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
// 	var k1 = Math.random() - 0.5;
// 	var k2 = Math.random() - 0.5;
// 	// 设置精灵模型位置，在空间中随机分布
// 	sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2)
// 	group.add(sprite);
// }
// scene.add(group);//雨滴群组插入场景中


function controllerFish(path){
    var textureTree = new THREE.TextureLoader().load(path);
    // textureTree.setSize(200,100);
    var group = new THREE.Group();

    var spriteMaterial = new THREE.SpriteMaterial({
        map:textureTree,//设置精灵纹理贴图
    });
    // 创建精灵模型对象
    var sprite = new THREE.Sprite(spriteMaterial);
    scene.add(sprite);
    // 控制精灵大小,
    sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
    var k1 = Math.random() - 0.5;
    var k2 = Math.random() - 0.5;
    // 设置精灵模型位置，在空间中随机分布
    sprite.position.set(200, 100, 200);
    group.add(sprite);

    scene.add(group);
    return group;
}

var group05 = controllerFish("img/fish01.jpeg");

function press(){
    window.onkeypress = function(e){
        console.log("key="+e.charCode);
        if(e.charCode===50){
            dicx = -1;
        }else if(e.charCode===49){
            // console.log(49);
            dicx = 1;
        }else if(e.charCode===51){
            // console.log(49);
            dicy = -1;
        }else if(e.charCode===52){
            // console.log(49);
            dicy = 1;
        }else if(e.charCode===53){
            // console.log(49);
            dicz = -1;
        }else if(e.charCode===54){
            // console.log(49);
            dicz = 1;
        } else if(e.charCode===32){
            dicx = dicy = dicz = 0;
        }
        console.log("press:"+dicx);
    }

}
press();

function sPress(num,type){
    // console.log("num="+num+" type="+type);
    if(type===0){
        if(num===0)snow=-1;
        else snow = 1;
    }else if(type===1){
        if(num===0)rain=-1;
        else rain = 1;
    }
}




// 渲染函数
function render() {

    group05.children.forEach(sprite=>{
        sprite.position.x += dicx;
        sprite.position.y += dicy;
        sprite.position.z += dicz;
        if(sprite.position.x > 600||sprite.position.x<-400){
            dicx = 0;
        }
        if(sprite.position.y > 400||sprite.position.y<0){
            dicy = 0;
        }
        if(sprite.position.z > 400||sprite.position.z<0){
            dicz = 0;
        }
        // console.log(dicx+"=====")
    });
    // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
    // 每次渲染都会更新雨滴的位置，进而产生动画效果
    group00.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.y += 3*rain;
        if (sprite.position.y < 0 || sprite.position.y > 400) {
            // 如果雨滴落到地面，重置y，从新下落
            if(rain===-1)sprite.position.y = 400;
            else sprite.position.y = 0;
        }
    });

    group01.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.x += 0.5;
        sprite.position.y -= 1;
        if (sprite.position.x > 400 || sprite.position.y < 0) {
            sprite.position.x = Math.random()*600-300;
            sprite.position.y = 400;
        }
    });

    group02.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.x += -1;
        // console.log(speed);
        if (sprite.position.x < -400 || sprite.position.x > 400) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.x = 400;
            // speed=-speed;/**/
        }
    });

    group03.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.z += 1;
        if (sprite.position.z > 400) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.z = -400;
        }
    });

    group04.children.forEach(sprite => {
        // 雨滴的y坐标每次减1
        sprite.position.y += snow*0.2;
        if (sprite.position.y < 0 || sprite.position.y > 400) {
            // 如果雨滴落到地面，重置y，从新下落
            if(snow===-1)sprite.position.y = 400;
            else sprite.position.y = 0;
        }
    });



    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建鼠标控制对象

//尺寸响应式
window.addEventListener('resize', () => {
    //初始化摄像机
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //初始化渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
})