"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
router.get("/", (req, res) => match_controller_1.matchController.getAll(req, res));
router.get("/:id", (req, res) => match_controller_1.matchController.getOne(req, res));
router.post("/create", (req, res) => match_controller_1.matchController.create(req, res));
router.put("/:id", (req, res) => match_controller_1.matchController.update(req, res));
router.delete("/:id", (req, res) => match_controller_1.matchController.delete(req, res));
exports.default = router;
//# sourceMappingURL=match.routes.js.map