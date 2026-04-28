"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractController = exports.ContractController = void 0;
const contract_service_1 = require("../services/contract.service");
class ContractController {
    async getAll(req, res) {
        try {
            const contracts = await contract_service_1.contractService.getAllContracts();
            return res.status(200).json(contracts);
        }
        catch (error) {
            console.error("GET /api/contracts error:", error);
            return res.status(500).json({ error: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const contract = await contract_service_1.contractService.getContractById(id);
            return res.status(200).json(contract);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const contract = await contract_service_1.contractService.createContract(req.body);
            return res.status(201).json(contract);
        }
        catch (error) {
            console.error("POST /api/contracts error:", error);
            return res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const contract = await contract_service_1.contractService.updateContract(id, req.body);
            return res.status(200).json(contract);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await contract_service_1.contractService.deleteContract(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ContractController = ContractController;
exports.contractController = new ContractController();
//# sourceMappingURL=contract.controller.js.map