// U "CAN" touch this
// 名前変えたい
function windowManager () {
    var FRAME_TIME = 1000 / 30;
	var STATIC_WIDTH =  600;
	var STATIC_HEIGHT = 800;
	var INIT_SCALE = window.innerWidth / STATIC_WIDTH;

	var $mapMain = $('#mapMain');
	$mapMain.css("zoom", INIT_SCALE);
	$mapMain.css("width", STATIC_WIDTH);
	$mapMain.css("height", STATIC_HEIGHT);

    // var reqAnimationFrame = (function () {
    //     return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
    //         window.setTimeout(callback, 1000 / 30);
    //     };
    // });

    //$(element).hammer(options).bind("pan", myPanHandler);

    var el = $("#mapMain")[0];
    el.className = 'animate';

    // var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    // var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
    var START_X = el.offsetWidth;
    var START_Y = el.offsetHeight;

    var isAnimated = false;
    var transform = null;
    // var timer;

    // transform = {
    //     translate: { x: START_X, y: START_Y },
    //     scale: 1
    // };
    // requestElementUpdate();

    var posx = 0;
    var posy = 0;
    var scale = 1;

    reset();

    var mc = new Hammer.Manager($("#mapFrame")[0]);
    mc.add(new Hammer.Pan());
    // mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    // mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    // mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('rotate'));
    mc.add(new Hammer.Pinch());
    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    // mc.add(new Hammer.Tap());

    mc.on("panstart", function(ev) {
        console.log("panstart");
        // requestElementUpdate();
        // transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        // transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        // var value = [
        //     'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        //     'scale(' + transform.scale + ', ' + transform.scale + ')'
        // ];

        // value = value.join(" ");
        // //el.textContent = value;
        // el.style.webkitTransform = value;
        // el.style.mozTransform = value;
        // el.style.transform = value;

        // reqAnimationFrame();

        isAnimated = true;
        transform = {
            translate : { x: posx, y: posy },
            scale: scale
        }
        // transform = {
        //     translate: { x: posx, y: posy },
        //     scale: scale
        // };

        // el.className = '';

        // transform.translate = {
        //     x: posx + ev.deltaX,
        //     y: posy + ev.deltaY
        // };
        animation();
    });

    mc.on("panmove", function(ev) {
        console.log("panmove");
        // requestElementUpdate();
        // transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        // transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        // var value = [
        //     'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        //     'scale(' + transform.scale + ', ' + transform.scale + ')'
        // ];
        // value = value.join(" ");
        //el.textContent = value;
        // el.style.webkitTransform = value;
        // el.style.mozTransform = value;
        // el.style.transform = value;

        // reqAnimationFrame();

        // el.className = '';

        transform.translate = {
            x: posx + ev.deltaX,
            y: posy + ev.deltaY
        };
    });

    mc.on("panend pancancel", function(ev) {
        console.log("panend");
        isAnimated = false;
        // transform = null;
        posx = transform.translate.x;
        posy = transform.translate.y;
    });

    mc.on("pinchstart", function(ev) {
        console.log("pinchstart");

        // transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        // transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        // var value = [
        //     'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        //     'scale(' + transform.scale + ', ' + transform.scale + ')'
        // ];

        // value = value.join(" ");
        // //el.textContent = value;
        // el.style.webkitTransform = value;
        // el.style.mozTransform = value;
        // el.style.transform = value;

        // // requestElementUpdate();
        // reqAnimationFrame();

        // console.log("pinch");
        // if(ev.type == 'pinchstart') {
        //     initScale = transform.scale || 1;
        // }

        // el.className = '';
        isAnimated = true;
        transform = {
            translate: { x: posx, y: posy },
            scale: scale
        };
        // transform.scale = scale * ev.scale;
    });
    mc.on("pinchmove", function(ev) {
        console.log("pinchmove");
        transform.scale = scale * ev.scale;
    });
    mc.on("pinchend pinchcancel", function(ev) {
        console.log("pinchend");
        isAnimated = false;
        scale = transform.scale;
    });

    mc.on("doubletap", function(ev) {

        // transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        // transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        // var value = [
        //     'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        //     'scale(' + transform.scale + ', ' + transform.scale + ')'
        // ];

        // value = value.join(" ");
        // //el.textContent = value;
        // el.style.webkitTransform = value;
        // el.style.mozTransform = value;
        // el.style.transform = value;

        // requestElementUpdate();
        // reqAnimationFrame();

        console.log("double tap");
        // transform.translate = {
        //     x: START_X,
        //     y: START_Y
        // };
        // transform.scale = 1;
        reset();
        // setTimeout(animation, FRAME_TIME);
        isAnimated = true;
        animation();
        isAnimated = false;

        // clearTimeout(timer);
        // timer = setTimeout(function () {}, 500);
    });

    // mc.on("hammer.input", function(ev) {
    //     if(ev.isFinal) {
    //         // resetElement();
    //         posx = transform.translate.x;
    //         posy = transform.translate.y;
    //         scale = transform.scale;
    //     }
    // });

    // function resetElement() {
    //     el.className = 'animate';
    //     transform = {
    //         translate: { x: START_X, y: START_Y },
    //         scale: window.innerWidth / STATIC_WIDTH
    //     };
    // }

    // function updateElementTransform() {
        // transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        // transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        // var value = [
        // 	'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        // 	'scale(' + transform.scale + ', ' + transform.scale + ')'
        // ];

        // value = value.join(" ");
        // //el.textContent = value;
        // el.style.webkitTransform = value;
        // el.style.mozTransform = value;
        // el.style.transform = value;
        // ticking = false;
    // }

    // function requestElementUpdate() {
    // 	if (!ticking) {
    // 		reqAnimationFrame(updateElementTransform);
    // 		ticking = true;
    // 	}
    // }

    // var initAngle = 0;
    // function onRotate(ev) {
    // 	console.log("rotate");
    //     // if(ev.type == 'rotatestart') {
    //     //     initAngle = transform.angle || 0;
    //     // }

    //     // el.className = '';
    //     // transform.rz = 1;
    //     // transform.angle = initAngle + ev.rotation;
    //     // requestElementUpdate();
    // }

    // function onSwipe(ev) {
    // 	console.log("swipe");
    //     // var angle = 50;
    //     // transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
    //     // transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
    //     // transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

    //     // clearTimeout(timer);
    //     // timer = setTimeout(function () {
    //     //     resetElement();
    //     // }, 300);
    //     // requestElementUpdate();
    // }

    // function onTap(ev) {
    // 	console.log("tap");
    //     // transform.rx = 1;
    //     // transform.angle = 25;

    //     // clearTimeout(timer);
    //     // timer = setTimeout(function () {
    //     //     resetElement();
    //     // }, 200);
    //     // requestElementUpdate();
    // }

    function reset() {
        transform = {
            translate: { x: START_X, y: START_Y },
            scale: 1
        };
    }

    function animation() {
        if (!isAnimated) {
            return;
        }

        transform.scale = (transform.scale >= 4.0) ? 4.0 : transform.scale;
        transform.scale = (transform.scale <= 0.5) ? 0.5 : transform.scale;

        var value = [
            'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
            'scale(' + transform.scale + ', ' + transform.scale + ')'
        ];

        value = value.join(" ");
        //el.textContent = value;
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;

        setTimeout(animation, FRAME_TIME);
    }

}