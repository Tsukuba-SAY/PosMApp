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
    $("#resetScaleButton").on("click", resetZoom);
    $(".posterfont").css("display", "none");

    var $posterArea = $("#posterArea");
    $posterArea.empty();
    taparea.forEach(function(area) {
        var $divarea = $("<div>")
            .attr("id", "area"+area.id)
            .addClass("mapArea")
            .css("position", "absolute")
            .css("z-index", 70)
            .css("opacity", 0.4)
            .css("background-color", area.color)
            .css("left", area.x*INIT_SCALE)
            .css("top", area.y*INIT_SCALE)
            .css("width", area.width*INIT_SCALE)
            .css("height", area.height*INIT_SCALE)
            .on("click", function() {
                zoomMap(area);
            });
        $posterArea.append($divarea);
    });

    hammerOnMap();
}

function zoomMap(area) {

    var mapMain = $("#mapMain");

    // // ズームの基準点を左上に変更
    // mapMain
    //     .css("-moz-transform-origin", "left top")
    //     .css("-webkit-transform-origin", "left top");

    var el = mapMain[0];
    el.className = 'animate';

    var zoomscale = 
        (area.direction === "longways") 
        ? MAP_AREA_HEIGHT / area.height / INIT_SCALE
        : MAP_AREA_WIDTH / area.width / INIT_SCALE;
    var zoomx = area.x * INIT_SCALE * (-zoomscale);
    var zoomy = area.y * INIT_SCALE * (-zoomscale);
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
    $("#resetScaleButtonFrame").css("display", "inline");
    $(".posterfont").css("display", "block");
    $(".bookmarkstar").sizeDownBookmarkStar();
    $("#prevDayButton").hide();
    $("#nextDayButton").hide();
}

function resetZoom() {
    
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

    $("#resetScaleButtonFrame").css("display", "none");
    $(".mapArea").css("display", "inline");
    $(".posterfont").css("display", "none");
    $(".bookmarkstar").sizeUpBookmarkStar();
    changePosterMapDate(Number(sessionStorage.getItem("currentPosterMapDate")));
}

function hammerOnMap() {
    var FRAME_TIME = 1000 / 10;
	// var INIT_SCALE = (window.innerHeight - 55 - 68) / STATIC_HEIGHT;

	var $mapMain = $('#mapMain');
    if (SCALE_BY === "height") {
        $("#mapImg").css("height", MAP_AREA_HEIGHT);
    } else {
        $("#mapImg").css("width", MAP_AREA_WIDTH);
    }

    var el = $("#mapMain")[0];
    el.className = 'animate';

    var START_X = 0;
    var START_Y = 0;

    isAnimated = false;

    reset();

    // var mc = new Hammer.Manager($("#mapFrame")[0]);
    mc.add(new Hammer.Pan());
    // mc.add(new Hammer.Pinch()).recognizeWith(mc.get("pan"));
    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));

    mc.on("panstart", function(ev) {
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

    mc.on("pinchstart", function(ev) {
        isAnimated = true;
        var origX = ((-posx + ev.center.x) / MAP_AREA_WIDTH).toString() + "%";
        var origY = ((-posy + ev.center.y) / MAP_AREA_HEIGHT).toString() + "%";
        $("#mapMain")
            .css("-moz-transform-origin", origX + " " + origY)
            .css("-webkit-transform-origin", origX + " " + origY);    
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
        $("#mapMain")
            .css("-moz-transform-origin", "left top")
            .css("-webkit-transform-origin", "left top");  
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

        transform.scale = (transform.scale >= 10.0) ? 10.0 : transform.scale;
        transform.scale = (transform.scale <= 0.2) ? 0.2 : transform.scale;

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