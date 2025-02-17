(function() {
    console.log("🚀 Injected Ultimate Speed Hack!");

    let boosting = false;
    const boostFactor = 1.75;  // Adjust for more speed if needed
    let baseSpeed = null;  // Stores the original speed

    // **Key Handling for Boost Activation**
    function handleKeyDown(e) {
        if (e.key === " " && !boosting) {
            boosting = true;
            console.log("🔥 Speed Boost Activated!");

            // Ensure the snake object exists
            if (window.snake && typeof window.snake.sp === 'number') {
                if (baseSpeed === null) baseSpeed = window.snake.sp;  // Store original speed only once
                window.snake.sp = baseSpeed * boostFactor;
            }
        }
    }

    function handleKeyUp(e) {
        if (e.key === " " && boosting) {
            boosting = false;
            console.log("⏳ Speed Boost Deactivated");

            // Reset to original speed if applicable
            if (window.snake && baseSpeed !== null) {
                window.snake.sp = baseSpeed;
            }
        }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // **Intercept WebSocket Messages (Anti-Cheat Bypass)**
    const originalSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        if (boosting && data instanceof ArrayBuffer) {
            const view = new DataView(data);
            
            // **Modify acceleration packet if it's the right format**
            if (view.byteLength === 2) {
                view.setUint8(1, 254); // Change acceleration to avoid direct detection
                view.setUint8(0, 1);   // Adjust packet structure slightly
            }
        }
        return originalSend.apply(this, arguments);
    };

})();
