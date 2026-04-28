"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const club_controller_1 = require("../controllers/club.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/settings", (req, res) => club_controller_1.clubController.getSettings(req, res));
router.put("/settings", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)(["ADMIN"]), (req, res) => club_controller_1.clubController.updateSettings(req, res));
exports.default = router;
//# sourceMappingURL=club.routes.js.map