"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_controller_1 = require("../controllers/player.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Publicly accessible for now (can be restricted later)
router.get("/", (req, res) => player_controller_1.playerController.getAll(req, res));
router.post("/create", (req, res) => {
    return player_controller_1.playerController.create(req, res);
});
router.get("/:id", (req, res) => player_controller_1.playerController.getOne(req, res));
router.delete("/:id", (req, res) => {
    return player_controller_1.playerController.delete(req, res);
});
// Restricted to medical and coach staff
router.get("/:id/risk", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)(["MEDICAL", "COACH", "ADMIN"]), (req, res) => player_controller_1.playerController.getRisk(req, res));
exports.default = router;
//# sourceMappingURL=player.routes.js.map