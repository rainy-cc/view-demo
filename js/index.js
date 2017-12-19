/*
*页面Js交互：
* 		author：xc
* 		date： 2016
*		contain： audio canvas css3 mousewheel 预加载等等；
*
*/

var oHeader = $('header');
var oContent = $('content');
var oNav = $('nav');
var aNavLi = oNav.getElementsByTagName('li');
var oArrow = $('arrow');
var oList = $('list');
var aListItem = getByClass(oList, 'listItem');
var oContentDot = $('contentDot');
var aSpans = oContentDot.getElementsByTagName('span');

var contentHeight = 0;
var iNow = 0;//存放当前是第几屏
var preIndex = 0; //上次是哪个屏;
var xcDemo = {};	//挂载页面的初始化函数;

xcDemo.init = function(){
	window.onresize = resizeFn;
	loading();
	setSection();
	//verticalFn();
	navClick();
	mouseScroll();
	//carousel();
	aboutFn();
	teamFn();
}
xcDemo.init();


//配置五个屏的进出场动画：
var enterData = [
	{//第一屏home
		/*
			位移的变化
		*/
		enterFn: function(){
			var oHomeWrap = $('homeWrap');
			var oCarousel = getByClass( oHomeWrap, 'carousel')[0];
			var oDot = getByClass(oHomeWrap, 'dot')[0];
			oCarousel.style.opacity = 1;
			oDot.style.opacity = 1;
			setCss3(oCarousel,{ transform: 'translate(0,0)' })
			setCss3(oDot,{ transform: 'translate(0,0)' })

		},
		leaveFn: function(){
			var oHomeWrap = $('homeWrap');
			var oCarousel = getByClass( oHomeWrap, 'carousel')[0];
			var oDot = getByClass(oHomeWrap, 'dot')[0];
			oCarousel.style.opacity = 0;
			oDot.style.opacity = 0;
			setCss3(oCarousel,{ transform: 'translate(0, -150px)' })
			setCss3(oDot,{ transform: 'translate(0, 100px)' })
		}
	},
	{//第2屏course
		/*
			位移
		*/
		enterFn: function(){
			var oCourseWrap = $('courseWrap');
			var oPlane1 = getByClass(oCourseWrap,'plane1')[0];
			var oPlane2 = getByClass(oCourseWrap,'plane2')[0];
			var oPlane3 = getByClass(oCourseWrap,'plane3')[0];
			setCss3(oPlane1 , { transform: 'translate(0,0)' });
			setCss3(oPlane2 , { transform: 'translate(0,0)' });
			setCss3(oPlane3 , { transform: 'translate(0,0)' });
		},
		leaveFn: function(){
			var oCourseWrap = $('courseWrap');
			var oPlane1 = getByClass(oCourseWrap,'plane1')[0];
			var oPlane2 = getByClass(oCourseWrap,'plane2')[0];
			var oPlane3 = getByClass(oCourseWrap,'plane3')[0];
			setCss3(oPlane1 , {transform: 'translate(-200px,-200px)'});
			setCss3(oPlane2 , {transform: 'translate(-200px,200px)'});
			setCss3(oPlane3 , {transform: 'translate(200px,-200px)'});
		}
	},
	{//第3屏works
		/*
			位移
		*/
		enterFn: function(){
			var oWorksWrap = $('worksWrap');
			var oPencil1 = getByClass(oWorksWrap,'pencil1')[0];
			var oPencil2 = getByClass(oWorksWrap,'pencil2')[0];
			var oPencil3 = getByClass(oWorksWrap,'pencil3')[0];
			setCss3(oPencil1 , {transform:'translate(0,0)'});
			setCss3(oPencil2 , {transform:'translate(0,0)'});
			setCss3(oPencil3 , {transform:'translate(0,0)'});
		},
		leaveFn: function(){
			var oWorksWrap = $('worksWrap');
			var oPencil1 = getByClass(oWorksWrap,'pencil1')[0];
			var oPencil2 = getByClass(oWorksWrap,'pencil2')[0];
			var oPencil3 = getByClass(oWorksWrap,'pencil3')[0];
			setCss3(oPencil1 , {transform: 'translate(0,-200px)'});
			setCss3(oPencil2 , {transform: 'translate(0,200px)'});
			setCss3(oPencil3 , {transform: 'translate(0,200px)'});
		}
	},
	{//第4屏about
		/*
			旋转
		*/
		enterFn: function(){
			var oAboutWrap = $('aboutWrap');
			var aPhoto = getByClass( oAboutWrap , 'photo' );
			setCss3(aPhoto[0],{transform:'rotate(0)'});
			setCss3(aPhoto[1],{transform:'rotate(0)'});
		},
		leaveFn: function(){
			var oAboutWrap = $('aboutWrap');
			var aPhoto = getByClass( oAboutWrap , 'photo' );
			setCss3(aPhoto[0],{ transform: 'rotate(45deg)' });
			setCss3(aPhoto[1],{ transform: 'rotate(-45deg)' });
		}
	},
	{//第5屏team
		/*
			从两侧进入
		*/
		enterFn: function(){
			var oTeamWrap = $('teamWrap');
			var oTitlebox = getByClass(oTeamWrap , 'titleBox')[0];
			var oDescription = getByClass(oTeamWrap , 'description')[0];
			oTitlebox.style.opacity = 1;
			oDescription.style.opacity = 1;
			setCss3( oTitlebox, {transform:'translate(0,0)'});
			setCss3( oDescription, {transform:'translate(0,0)'});
		},
		leaveFn: function(){
			var oTeamWrap = $('teamWrap');
			var oTitlebox = getByClass(oTeamWrap , 'titleBox')[0];
			var oDescription = getByClass(oTeamWrap , 'description')[0];
			oTitlebox.style.opacity = 0;
			oDescription.style.opacity = 0;
			setCss3( oTitlebox, { transform: 'translate(-200px,0)'});
			setCss3( oDescription, { transform: 'translate(200px,0)'});
		}
	}
];
//一上来都是出场动画
for( var i = 0; i<enterData.length; i++  ){
	enterData[i].leaveFn();
}
//页面的预加载
function loading(){
	var oLoading = $('loading');
	var oSpan = oLoading.getElementsByTagName('span')[0];
	var aDiv = oLoading.getElementsByTagName('div');
	var number = 0;//记录当前加载数量;
	for( var i = 0; i<imgData.length; i++ ){
		var oImage = new Image();
		oImage.src = imgData[i];
		oImage.onload = function(){
			number++;
			oSpan.style.width = number/imgData.length*100 + '%';  //百分比计算;
		};
	}
	oSpan.addEventListener('webkitTransitionend', loadingOver, false);
	oSpan.addEventListener('mozTransitionend', loadingOver, false);
	oSpan.addEventListener('oTransitionend', loadingOver, false);
	oSpan.addEventListener('transitionend', loadingOver, false);
	//加载结束
	function loadingOver(){
		if(oSpan.style.width == '100%'){
			oSpan.style.display = 'none';
			aDiv[0].style.height = 0;
			aDiv[1].style.height = 0;
		}
	}
	aDiv[0].addEventListener('webkitTransitionend', divMiss, false);
	aDiv[0].addEventListener('mozTransitionend', divMiss, false);
	aDiv[0].addEventListener('oTransitionend', divMiss, false);
	aDiv[0].addEventListener('transitionend', divMiss, false);
	//当div' 的高度变为O 的事后触发的函数;
	function divMiss(){
		oLoading.parentNode.removeChild(oLoading);
		music();
		enterData[0].enterFn();
		carousel();
	}
}
//nav的每一项点击选中状态的切换：
function navClick(){
	//默认第一个百分之百;
	var oUpDiv = aNavLi[0].getElementsByTagName('div')[0];
		oUpDiv.style.width = '100%';
	//设置箭头的初始位置（居中）
	oArrow.style.left = aNavLi[0].offsetLeft + aNavLi[0].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';

	for( var i = 0; i<aNavLi.length; i++ ){
		aNavLi[i].index = i;
		aNavLi[i].onclick = function(){
			prevIndex = iNow;
			iNow = this.index;
			toChange(iNow);
		};
	};
	dotClick();
}
//右侧圆点的点击功能;
function dotClick(){
	for( var i = 0; i<aNavLi.length; i++ ){
		aSpans[i].index = i;
		aSpans[i].onclick = function(){
			prevIndex = iNow;
			toChange(this.index);
			iNow = this.index;
		}
	}
}
//切换功能的封装;
function toChange(index){
	for( var i = 0; i<aNavLi.length; i++ ){
		var oUpDiv = aNavLi[i].getElementsByTagName('div')[0];
		oUpDiv.style.width = '0';
	};
	//设置当前
	var oUpDiv = aNavLi[index].getElementsByTagName('div')[0];
	oUpDiv.style.width = '100%';
	//箭头的移动
	oArrow.style.left = aNavLi[index].offsetLeft + aNavLi[index].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
	//每一屏的切换
	oList.style.top = -index * contentHeight + 'px';
	//固定右边的每一屏圆点的切换
	for( var i = 0; i<aNavLi.length; i++ ){
		aSpans[i].className = '';
	}
	aSpans[index].className = 'active';
	//进出场动画：当前进，上一个prevIndex还原
	if( enterData[index].enterFn ){
		enterData[index].enterFn();
	};
	if( enterData[prevIndex].leaveFn ){
		enterData[prevIndex].leaveFn();
	};
}
//每一屏的高度设置
function setSection(){
	contentHeight = viewHeight() - oHeader.offsetHeight;
	//console.log(contentHeight)//558
	oContent.style.height = contentHeight + 'px';
	//每一屏高度的设置：
	for( var i = 0; i<aListItem.length; i++ ){
		aListItem[i].style.height = contentHeight + 'px';
		oList.style.top = -iNow * contentHeight + 'px';
	}

}
/*
//让每一屏的内容区域垂直居中;
function verticalFn(){
	var aListContent = getByClass( oList, 'listContent');
	var middle = Math.floor((contentHeight - 520)/2);
	alert(middle)
	for( var i = 0; i<aListContent.length; i++ ){
		aListContent[i].style.marginTop = middle + 'px';
	};
}*/
//浏览器大小的改变的渲染;
function resizeFn(){
	setSection();//每一屏幕重新设置高度;
}
//滚轮切换屏幕
function mouseScroll(){
	var timer = null;
	//正常
	oContent.onmousewheel = function(ev){
		var ev = ev || window.event;
		clearTimeout(timer);
		timer = setTimeout(function(){
			changeFn(ev);
		}, 200);
	};
	//ff
	if (oContent.addEventListener) {
		oContent.addEventListener(
			'DOMMouseScroll',
			function(ev){
				var ev = ev || window.event;
				clearTimeout(timer);
				timer = setTimeout(function(){
					changeFn(ev);
				}, 200);
			},
			false
		);
	};

	function changeFn(ev){
		//处理针对prevIndex的小BUG
		if( iNow == 0 && ev.wheelDelta == 120 || ev.detail == -3){
			return;
		};
		if( iNow == aListItem.length-1 && ev.wheelDelta == -120 || ev.detail == 3){
			return;
		};
		prevIndex = iNow;
		//console.log(prevIndex)
		if( ev.wheelDelta == 120 || ev.detail == -3 ){
			//向上滚动
			/*iNow--;
			if( iNow < 0 ){
				iNow = 0;
			};*/
			if(iNow != 0){
				iNow--;
			};
			toChange(iNow);
		}else{
			//向下
			if(iNow != aListItem.length-1){
					iNow++;
			};
			/*iNow++;
			//console.log(iNow)
			if(iNow>aListItem.length-1){
				iNow=aListItem.length-1;
			};*/
			toChange(iNow);
		};
		//阻止默认事件;
		if(ev.preventDefault){
			ev.preventDefault();
		};
		return false;
	}
}
//音乐的播放与暂停：
function music(){
	var oMusic = $('music');
	var oAudio = $('myAudio');
	var onoff = false;//控制播放还是暂停
	oMusic.style.backgroundImage = 'url(./img/musicon.gif)';
	oAudio.play();//播放;
	oMusic.onclick = function(){
		if(onoff){
			oMusic.style.backgroundImage = 'url(./img/musicon.gif)';
			oAudio.play();//播放;
		}else{
			oMusic.style.backgroundImage = 'url(./img/musicoff.gif)';
			oAudio.pause();//暂停;
		};
		onoff = !onoff;
	};
}
//第一屏的轮播
function carousel(){
	var oHomeWrap = $('homeWrap');
	var oCarousel = getByClass( oHomeWrap, 'carousel')[0];
	var aTabImg = oCarousel.getElementsByTagName('li');
	var oDot = getByClass(oHomeWrap, 'dot')[0];
	var aDotBtns = oDot.getElementsByTagName('li');
	var lastIndex = 0;
	var nowIndex = 0;
	var carouselTimer = null;
	for( var i = 0; i<aDotBtns.length; i++ ){
		aDotBtns[i].index = i;
		aDotBtns[i].onclick = function(){
			//点的状态切换
			for(var i = 0; i<aDotBtns.length; i++){
				aDotBtns[i].className = '';
			};
			this.className = 'active';
			if(lastIndex < this.index){
				//从左向右的切换
				aTabImg[lastIndex].className = 'leftHide';
				aTabImg[this.index].className = 'rightShow';

			}else if(lastIndex > this.index){
				//右向左的切换
				aTabImg[lastIndex].className = 'rightHide';
				aTabImg[this.index].className = 'leftShow';
			};
			nowIndex = this.index;
			lastIndex = this.index;//重新赋值
		}
	};
	//自动播放
	clearInterval(carouselTimer);
	carouselTimer = setInterval(autoplay,2000);
	//移入关闭
	oHomeWrap.onmouseover = function(){
		clearInterval(carouselTimer);
	}
	/*
	//移除继续
	oHomeWrap.onmouseout = function(){
		carouselTimer = setInterval(autoplay,2000);
	}*/
	function autoplay(){
		nowIndex++;
		//循环
		if(nowIndex == aDotBtns.length){
			nowIndex = 0;
		};
		for(var i = 0; i<aDotBtns.length; i++){
			aDotBtns[i].className = '';
		};
		aDotBtns[nowIndex].className = 'active';
		aTabImg[lastIndex].className = 'leftHide';
		aTabImg[nowIndex].className = 'rightShow';
		lastIndex = nowIndex;
	}
}
//第四屏
function aboutFn(){
	var oAboutWrap = $('aboutWrap');
	var photos = getByClass(oAboutWrap, 'photos')[0];
	var aUl = photos.getElementsByTagName('ul');
	var aDiv = getByClass(photos, 'imgBg');
	sliceImg(aUl[0],aDiv[0]);
	sliceImg(aUl[1],aDiv[1]);

	//封装四个小图片的生成与运动
	function sliceImg(obj, scaleImg){
		var src = '';
		if(obj.dataset){//ie9 不支持;
			src = obj.dataset.src;
		};
		src = obj.getAttribute('data-src');
		var w = obj.offsetWidth/2;
		var h = obj.offsetHeight/2;
		var len = 4;
		//创建四个小的图片碎片;
		for( var i = 0; i<len; i++ ){
			var oLi = document.createElement('li');
			var oImg = document.createElement('img');
			oLi.style.width = w + 'px';
			oLi.style.height = h + 'px';
			oImg.src = src;
			oImg.style.left = -i%2 * w + 'px';
			oImg.style.top = -Math.floor(i/2) * h + 'px';
			oImg.originleft= -i%2 * w;
			oImg.origintop= -Math.floor(i/2) * h;
			oLi.appendChild(oImg);
			obj.appendChild(oLi);
		}
		/*
			鼠标移入四张图从四个方向变化，同时后面的图有个缩放的效果;
		*/
		//保存切入方向和要移动的数值;
		var aSliceImg= obj.getElementsByTagName('img');
		var dirArr = [
			{ direction : 'top' , val : h },
			{ direction : 'left' , val : -w*2 },
			{ direction : 'left' , val : w },
			{ direction : 'top' , val : -h*2 }
		];
		//移入的消失
		obj.onmouseover = function(){
			for( var i = 0; i<aSliceImg.length; i++ ){
				aSliceImg[i].style[ dirArr[i].direction ] = dirArr[i].val + 'px';
			};
			//可以封装一个处理css3前缀的函数;
			setCss3(scaleImg,{transform: 'scale(1)'});
			// scaleImg.style.webkitTransform = scaleImg.style.mozTransform = scaleImg.style.oTransform = scaleImg.style.transform = 'scale(1)';
		};
		//还原，需要拿到旧值;
		obj.onmouseout = function(){
			for( var i = 0; i<aSliceImg.length; i++ ){
				aSliceImg[i].style[ dirArr[i].direction ] = aSliceImg[i]['origin'+dirArr[i].direction]  + 'px';
			}
			setCss3(scaleImg,{transform: 'scale(1.5)'});
			// scaleImg.style.webkitTransform = scaleImg.style.mozTransform = scaleImg.style.oTransform = scaleImg.style.transform = 'scale(1.5)';
		};

	}

}
//第五屏：opacity canvas
teamFn();
function teamFn(){
	var oTeamWrap = $('teamWrap');
	var oMember = getByClass(oTeamWrap, 'member')[0];
	var aLimember = oTeamWrap.getElementsByTagName('li')
	var timer = null;
	var timer2 = null;
	var balls = [];
	var oCanvas = null;
	//console.log(aLimember.length)
	//拿到宽高
	var w = aLimember[0].offsetWidth;
	var h = aLimember[0].offsetHeight;
	console.log(w,h)
	//每个li的背景定位
	for( var i = 0; i<aLimember.length; i++ ){
		aLimember[i].index = i;
		aLimember[i].style.backgroundPosition = -i*w +'px 0';

		aLimember[i].onmouseover = function(){
			createCanvas();
			oCanvas.style.left = this.index * w + 'px';
			for(var i=0;i<aLimember.length;i++){
				aLimember[i].style.opacity = 0.5;
			}
			this.style.opacity = 1;
		}
	};
	//避免冒泡的影响;
	oMember.onmouseleave = function(){
		deleteCanvas();//删除canvas元素
		//复原opacity
		for( var i = 0; i<aLimember.length; i++ ){
			aLimember[i].style.opacity = 1;
		}
	}
	//创建canvas
	function createCanvas(){
		if(!oCanvas){
			oCanvas = document.createElement('canvas');
			oCanvas.id = 'drawing';
			oCanvas.width = w;
			oCanvas.height = 350; //原来的h优点大
			oMember.appendChild(oCanvas);
			var context = oCanvas.getContext('2d');//拿到绘图环境;
			var balls = [];//存放小球的的数组;
			//绘制圆
			timer = setInterval(function(){
				//清空画布
				context.clearRect( 0, 0, oCanvas.width, oCanvas.height );

				for(var i=0;i<balls.length;i++){

					balls[i].angle += 5;

					balls[i].x = balls[i].startX - Math.sin(balls[i].angle * Math.PI/180) * balls[i].step;
					balls[i].y = balls[i].startY - (balls[i].angle * Math.PI/180) * balls[i].step;
					//删除小球;
					if( balls[i].y < 50 ){
						balls.splice( i, 1 );
						console.log(balls.length);
					};

				};

				for(var i=0;i<balls.length;i++){
					//绘制
					context.fillStyle = 'rgba('+balls[i].r+','+balls[i].g+','+balls[i].b+','+balls[i].a+')';
					context.beginPath();
						context.moveTo( balls[i].x, balls[i].y );
						context.arc( balls[i].x, balls[i].y, balls[i].R, 0, 2 * Math.PI, false);
					context.closePath();
					context.fill();
				};

			}, 17);

			//生成圆
			timer2 = setInterval(function(){
				var x = Math.random() * oCanvas.width; //圆心
				var y = oCanvas.height - 10;
				var R = Math.random() * 6 + 2; //半径
				var red = Math.round(Math.random() * 255);//rgba
				var green = Math.round(Math.random() * 255);
				var blue = Math.round(Math.random() * 255);
				var opacity = 1;
				var angle = 0; //正弦曲线的角度
				var step = Math.random()*20 + 10;
				var startX = x;
				var startY = y;
				//将每一个球的数据存入数组;
				balls.push({
					x : x,
					y : y,
					R : R,
					r : red,
					g : green,
					b : blue,
					a : opacity,
					angle : angle,
					step : step,
					startX : x,
					startY : y
				});
			},100);
		};
	}
	//删除canvas
	function deleteCanvas(){
		clearInterval(timer);
		clearInterval(timer2);
		oMember.removeChild(oCanvas);
		oCanvas = null;
	}


}



//通过id获取元素
function $(id){
	return document.getElementById(id);
}
//通过class来获取元素;
function getByClass(oParent,cName){
	var aElem = oParent.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<aElem.length;i++){
		if( aElem[i].className == cName ){
			arr.push( aElem[i] );
		};
	};
	return arr;
}
//封装获取可视区宽高的函数;
function viewWidth(){
	return window.innerWidth || document.documentElement.clientWidth;
}

function viewHeight(){
	return window.innerHeight || document.documentElement.clientHeight;
}
//处理css3前缀的函数;
function setCss3 (obj,attrObj) {
	for( var i in attrObj ) {
		var attr = i;
		if( attr.indexOf("-") > 0 ){
			var num = attr.indexOf("-");
			attr = attr.replace(attr.substr(num,2),attr.substr(num + 1,1).toUpperCase());
	 	};
		obj.style[attr] = attrObj[i];
		attr=attr.replace(attr.charAt(0),attr.charAt(0).toUpperCase());
		obj.style["webkit" + attr] = attrObj[i];
		obj.style["moz" + attr] = attrObj[i];
		obj.style["o" + attr] = attrObj[i];
		obj.style["ms" + attr] = attrObj[i];
	}
}
