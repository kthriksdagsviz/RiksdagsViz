import express from 'express';
import ctrl from './votering.ctrl'

const router = express.Router()

router
    .route('/votering/fill')
    .get(ctrl.fillDb)

    
export default router