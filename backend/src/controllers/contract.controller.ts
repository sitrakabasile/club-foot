import { Request, Response } from "express";
import { contractService } from "../services/contract.service";

export class ContractController {
  async getAll(req: Request, res: Response) {
    try {
      const contracts = await contractService.getAllContracts();
      return res.status(200).json(contracts);
    } catch (error: any) {
      console.error("GET /api/contracts error:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await contractService.getContractById(id as string);
      return res.status(200).json(contract);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const contract = await contractService.createContract(req.body);
      return res.status(201).json(contract);
    } catch (error: any) {
      console.error("POST /api/contracts error:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await contractService.updateContract(id as string, req.body);
      return res.status(200).json(contract);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await contractService.deleteContract(id as string);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const contractController = new ContractController();
