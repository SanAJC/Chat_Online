
import { Router } from 'express';
import { getMessagesBetween , getConversations} from '../handlers/messageHandlers';

const router = Router();
router.get('/conversations/:userId', getConversations);
router.get('/:senderId/:receiverId', getMessagesBetween);

export default router;
