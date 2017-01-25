import { ShapesRegistry } from '../shapesregistry.js';

let scrollEvents = {
    initialize: initialize
};
let shapes = new ShapesRegistry();

function initialize() {

    let nowScrolling = false;
    var last_known_scroll_position = 0;
    var ticking = false;

    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                shapes.allCanvases.forEach(canvas => {
                    canvas.currentY = last_known_scroll_position;
                    canvas.scroll(0)
                });
                //document.getElementById("main").style.marginTop = -last_known_scroll_position + "px"
                ticking = false;
            });
        }
        ticking = true;
    });
}

export { scrollEvents }