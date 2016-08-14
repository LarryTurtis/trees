import { Canvas } from '../canvas.js';
import { ShapesRegistry } from '../shapesregistry.js';

let mouseEvents = {
    initialize: initialize
}

let canvas = new Canvas();
let shapesRegistry = new ShapesRegistry();
let clickedShape = null;
let mouse = { x: null, y: null };
let prevMouse = { x: null, y: null };
let direction = { left: false, right: false, up: false, down: false };
let mouseClick = null;
let mouseMove = null;

function initialize() {
    window.addEventListener("mousedown", clickObject);
    window.addEventListener("mouseup", releaseObject);
}

function clickObject(e) {
    let bRect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    mouse.y = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    shapesRegistry.forEach(shape => {
        let clicked = shape.wasClicked(mouse.x, mouse.y);

        if (clicked) {

            mouseClick = new CustomEvent('mouseClick', {
                detail: { shape: clicked }
            });

            canvas.dispatchEvent(mouseClick);
            window.addEventListener("mousemove", dragObject, false)
        }
    });
}

function dragObject(e) {
    let bRect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    mouse.y = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    clickedShape = null;

    shapesRegistry.forEach(shape => {
        clickedShape = clickedShape || shape.wasClicked(mouse.x, mouse.y);
    });

    if (prevMouse.x) {

        mouseMove = new CustomEvent('mouseMove', {
            detail: { direction: direction, mouse: mouse, shape: clickedShape }
        });

        direction.left = prevMouse.x > mouse.x;
        direction.right = prevMouse.x < mouse.x;
        direction.up = prevMouse.y > mouse.y;
        direction.down = prevMouse.y < mouse.y;
        canvas.dispatchEvent(mouseMove);

    }

    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;


}

function releaseObject() {
    window.removeEventListener("mousemove", dragObject, false);
}

export { mouseEvents }