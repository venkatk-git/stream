"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/protected', (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.send(`Hello, ${req.session.user.username}`);
    }
    else {
        console.error('Not Working');
        res.status(401).redirect('/auth/google');
    }
});
exports.default = router;
