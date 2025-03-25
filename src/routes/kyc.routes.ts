import { Router } from 'express';
import { KYCController } from '../controllers/kyc.controller';

const router = Router();
const kycController = new KYCController();

router.post('/verify', kycController.verifyUser.bind(kycController));
router.post('/callback', kycController.callbackHandler.bind(kycController));

export default router;