import express from 'express';
import ctrl from './ledamoter.ctrl'

const router = express.Router()

router
    .route('/ledamoter/name')
    .get(ctrl.getLedamoterByName)



export default router