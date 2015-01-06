var mc = null;
var transform = null;
var posx = 0;
var posy = 0;
var scale = 1;
var resx = 0;
var resy = 0;
var resscale = 1;
var isAnimated = false;

function initHammer() {
    // Hammer Managerをポスターマップのフレームに
    mc = new Hammer.Manager($("#mapFrame")[0]);

    $("#resetScaleButtonFrame").css("display", "none");

    // ズームの基準点は各エリアの左上
    $("#taparea1").on("touchstart", function() {
        zoomMap(-40, -10, 1);
    });
    $("#taparea2").on("touchstart", function() {
        zoomMap(-40, -220, 1);
    }); 
    $("#taparea3").on("touchstart", function() {
        zoomMap(-180, -10, 1);
    });
    $("#taparea4").on("touchstart", function() {
        zoomMap(-115, -400, 1);
    });
    $("#resetScaleButton").on("touchstart", resetZoom);
}

function zoomMap(zoomx, zoomy, zoomscale) {
    hammerOnMap();

	$("#resetScaleButtonFrame").css("display", "inline");
    var mapMain = $("#mapMain");

    // // ズームの基準点を左上に変更
    // mapMain
    //     .css("-moz-transform-origin", "left top")
    //     .css("-webkit-transform-origin", "left top");

    var el = mapMain[0];
    el.className = 'animate';

    transform = {
        translate: { x: zoomx, y: zoomy },
        scale: zoomscale
    };
    var value = [
        'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        'scale(' + transform.scale + ', ' + transform.scale + ')'
    ];
    value = value.join(" ");
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    posx = transform.translate.x;
    posy = transform.translate.y;
    scale = transform.scale;
    resx = posx;
    resy = posy;
    resscale = scale;
    $(".mapArea").css("display", "none");
}

function resetZoom() {

	hammerOffMap();
	$("#resetScaleButtonFrame").css("display", "none");
    var el = $("#mapMain")[0];
    el.className = 'animate';

    transform = {
        translate: { x: 0, y: 0 },
        scale: 1
    };
    var value = [
        'translate(' + transform.translate.x + 'px, ' + transform.translate.y + 'px)',
        'scale(' + transform.scale + ', ' + transform.scale + ')'
    ];
    value = value.join(" ");
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    posx = transform.translate.x;
    posy = transform.translate.y;
    scale = transform.scale;
    resx = posx;
    resy = posy;
    resscale = scale;
    $(".mapArea").css("display", "inline");
}

function hammerOffMap() {
	mc.off("panstart panmove panend pancancel pinchstart pinchmove pinchend pinchcancel doubletap");
}


function hammerOnMap() {
    var FRAME_TIME = 1000 / 30;
	var INIT_SCALE = window.innerWidth / STATIC_WIDTH;

	var $mapMain = $('#mapMain');
    $("#mapImg").css("width", window.innerWidth);

    var el = $("#mapMain")[0];
    el.className = 'animate';

    var START_X = 0;
    var START_Y = 0;

    isAnimated = false;

    reset();

    // var mc = new Hammer.Manager($("#mapFrame")[0]);
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Pinch()).recognizeWith(mc.get("pan"));
    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));

    mc.on("panstart", function() {
        isAnimated = true;
        transform = {
            translate : { x: posx, y: posy },
            scale: scale
        };
        animation();
    });

    mc.on("panmove", function(ev) {
        transform.translate = {
            x: posx + ev.deltaX,
            y: posy + ev.deltaY
        };
    });

    mc.on("panend pancancel", function() {
        isAnimated = false;
        posx = transform.translate.x;
        posy = transform.translate.y;
    });

    mc.on("pinchstart", function() {
        isAnimated = true;
        transform = {
            translate: { x: posx, y: posy },
            scale: scale
        };
        animation();
    });

    mc.on("pinchmove", function(ev) {
        transform.scale = scale * ev.scale;
    });

    mc.on("pinchend pinchcancel", function(ev) {
        isAnimated = false;
        scale = transform.scale;
    });

    mc.on("doubletap", function() {
        reset();
        isAnimated = true;
        animation();
        isAnimated = false;
    });

    function reset() {
        posx = resx;
        posy = resy;
        scale = resscale;
        transform = {
            translate: { x: resx, y: resy },
            scale: resscale
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
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;

        setTimeout(animation, FRAME_TIME);
    }
}