let _gravity = false;

function gravity(bool) {
    _gravity = bool || _gravity;
    return _gravity;
};

export { gravity };