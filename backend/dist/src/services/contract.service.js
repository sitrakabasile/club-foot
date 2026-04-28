"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractService = exports.ContractService = void 0;
const contract_repository_1 = require("../repositories/contract.repository");
class ContractService {
    async getAllContracts() {
        return contract_repository_1.contractRepository.findAll();
    }
    async getContractById(id) {
        const contract = await contract_repository_1.contractRepository.findById(id);
        if (!contract)
            throw new Error("Contrat non trouvé");
        return contract;
    }
    async createContract(data) {
        // Basic required fields validation
        if (!data.playerId)
            throw new Error("Le joueur est requis");
        if (!data.salary && data.salary !== 0)
            throw new Error("Le salaire est requis");
        if (!data.startDate)
            throw new Error("La date de début est requise");
        if (!data.endDate)
            throw new Error("La date de fin est requise");
        // Date validity validation
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        if (isNaN(start.getTime()))
            throw new Error("Date de début invalide");
        if (isNaN(end.getTime()))
            throw new Error("Date de fin invalide");
        // Date logic validation
        if (start > end) {
            throw new Error("La date de fin doit être après la date de début");
        }
        // Salary validation
        const salary = parseFloat(data.salary);
        if (isNaN(salary) || salary < 0) {
            throw new Error("Le salaire doit être un nombre positif");
        }
        return contract_repository_1.contractRepository.create({
            playerId: data.playerId,
            salary: salary,
            startDate: start,
            endDate: end,
            status: data.status || "ACTIVE",
            type: data.type || "PLAYER",
            notes: data.notes || null,
        });
    }
    async updateContract(id, data) {
        const formattedData = { ...data };
        // Handle salary formatting
        if (data.salary !== undefined) {
            const salary = parseFloat(data.salary);
            if (isNaN(salary) || salary < 0) {
                throw new Error("Le salaire doit être un nombre positif");
            }
            formattedData.salary = salary;
        }
        // Handle date formatting and validation
        if (data.startDate || data.endDate) {
            const current = await this.getContractById(id);
            const start = data.startDate ? new Date(data.startDate) : new Date(current.startDate);
            const end = data.endDate ? new Date(data.endDate) : new Date(current.endDate);
            if (isNaN(start.getTime()))
                throw new Error("Date de début invalide");
            if (isNaN(end.getTime()))
                throw new Error("Date de fin invalide");
            if (start > end) {
                throw new Error("La date de fin doit être après la date de début");
            }
            if (data.startDate)
                formattedData.startDate = start;
            if (data.endDate)
                formattedData.endDate = end;
        }
        return contract_repository_1.contractRepository.update(id, formattedData);
    }
    async deleteContract(id) {
        return contract_repository_1.contractRepository.delete(id);
    }
}
exports.ContractService = ContractService;
exports.contractService = new ContractService();
//# sourceMappingURL=contract.service.js.map