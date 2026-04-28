"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contract_controller_1 = require("../controllers/contract.controller");
const router = (0, express_1.Router)();
// Routes (Temporarily public for testing)
router.get("/", (req, res) => contract_controller_1.contractController.getAll(req, res));
router.get("/:id", (req, res) => contract_controller_1.contractController.getOne(req, res));
router.post("/", (req, res) => contract_controller_1.contractController.create(req, res));
router.put("/:id", (req, res) => contract_controller_1.contractController.update(req, res));
router.delete("/:id", (req, res) => contract_controller_1.contractController.delete(req, res));
exports.default = router;
//# sourceMappingURL=contract.routes.js.map