import express from 'express';
import ctrl from './ledamoter.ctrl'

const router = express.Router()

router
    .route('/ledamoter/fill')
    .get(ctrl.fillDb)

router
    .route('/votering/:id')
    .get(ctrl.getVoteringarById)

router
    .route('/votering/date/:date')
    .get(ctrl.getVoteringarByDate)

export default router