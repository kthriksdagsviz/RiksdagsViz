import express from 'express';
import ctrl from './nyheter.ctrl'

const router = express.Router()

router
    .route('/nyheter')
    .get(ctrl.getNyheterByParams)

export default router