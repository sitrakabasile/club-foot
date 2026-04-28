import { Request, Response } from "express";
export declare class ClubController {
    getSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const clubController: ClubController;
//# sourceMappingURL=club.controller.d.ts.map