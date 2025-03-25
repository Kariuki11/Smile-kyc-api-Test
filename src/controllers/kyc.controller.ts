import { Request, Response } from 'express';
import { SmileService } from '../services/smile.service';

export class KYCController {
  private smileService = new SmileService();

  async verifyUser(req: Request, res: Response) {
    try {
      const verificationData = await this.smileService.verifyUser(req.body);
      res.json({
        success: true,
        data: verificationData,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async callbackHandler(req: Request, res: Response) {
    // This handles the callback from Smile Identity
    console.log('Callback received:', req.body);
    
    // Process the callback data as needed
    // You might want to update your database here
    
    res.json({
      success: true,
      message: 'Callback received successfully',
    });
  }
}