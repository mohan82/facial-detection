let lastTime = 0;

let MedialHelper = {};

MedialHelper.URL = window.URL || window.webkitURL;

    MedialHelper.requestAnimationFrame = function (callback, element) {
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    return requestAnimationFrame.call(window, callback, element);
};

MedialHelper.getUserMedia = function (options, success, error) {
    var getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.webkitGetUserMedia ||
        function (options, success, error) {
            error();
        };

    return getUserMedia.call(window.navigator, options, success, error);
}

export default MedialHelper;