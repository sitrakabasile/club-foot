"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
/**
 * AuthRoutes — Authentication endpoints.
 */
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (req, res) => auth_controller_1.authController.register(req, res));
router.post("/login", (req, res) => auth_controller_1.authController.login(req, res));
router.post("/forgot-password", (req, res) => auth_controller_1.authController.forgotPassword(req, res));
router.post("/reset-password", (req, res) => auth_controller_1.authController.resetPassword(req, res));
router.get("/test", (req, res) => res.json({ message: "auth router working" }));
// Protected routes
router.get("/me", auth_middleware_1.authMiddleware, (req, res) => {
    console.log("GET /me hit for user:", req.user?.id);
    return auth_controller_1.authController.me(req, res);
});
router.put("/profile", auth_middleware_1.authMiddleware, (req, res) => auth_controller_1.authController.updateProfile(req, res));
router.put("/password", auth_middleware_1.authMiddleware, (req, res) => auth_controller_1.authController.changePassword(req, res));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map