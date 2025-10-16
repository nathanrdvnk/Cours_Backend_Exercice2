import express from 'express';
import todocontroller from '../controllers/todocontroller.js';

const router = express.Router();

router.get('/', todocontroller.list);
router.post('/', todocontroller.add);
router.delete('/:id', todocontroller.delete);

export default router;