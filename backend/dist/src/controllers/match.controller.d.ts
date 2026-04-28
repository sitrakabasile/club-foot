import { Request, Response } from "express";
export declare class MatchController {
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOne(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const matchController: MatchController;
//# sourceMappingURL=match.controller.d.ts.map