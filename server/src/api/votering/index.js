import express from 'express';
import ctrl from './votering.ctrl'

const router = express.Router()

router
    .route('/votering')
    .get(ctrl.getDb)

router
    .route('/votering/fill')
    .get(ctrl.fillDb)

router
    .route('/votering/:id')
    .get(ctrl.getVoteringarById)

router
    .route('/votering/date/:date')
    .get(ctrl.getVoteringarByDate)

export default router