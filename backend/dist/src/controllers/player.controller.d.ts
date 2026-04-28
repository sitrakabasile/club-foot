import { Request, Response } from "express";
/**
 * PlayerController — HTTP delivery layer for player data.
 */
export declare class PlayerController {
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOne(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRisk(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const playerController: PlayerController;
//# sourceMappingURL=player.controller.d.ts.map