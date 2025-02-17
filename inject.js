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
            
            // Check if the packet matches the speed-boosting packet structure
            if (view.byteLength === 2) {
                view.setUint8(1, 255);  // Set max acceleration

                // 🛠️ **Hack to prevent length reduction**
                view.setUint8(0, 0);  // Modify another part of the packet (anti-length reduction trick)
            }
        }
        return originalSend.apply(this, arguments);
    };

})();
