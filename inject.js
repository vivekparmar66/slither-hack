(function() {
    console.log("🚀 Injected Speed Hack!");

    var boosting = false;
    document.addEventListener("keydown", function(e) {
        if (e.key === " ") {
            boosting = true;
            console.log("🔥 Speed Boost Activated!");
        }
    });

    document.addEventListener("keyup", function(e) {
        if (e.key === " ") {
            boosting = false;
            console.log("⏳ Speed Boost Deactivated");
        }
    });

    var originalSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        if (boosting && data instanceof ArrayBuffer) {
            var view = new DataView(data);
            if (view.byteLength === 2) {
                view.setUint8(1, 255); // Modify acceleration packet
            }
        }
        return originalSend.apply(this, arguments);
    };

})();