import express from 'express';
import ctrl from './ledamoter.ctrl'

const router = express.Router()

router
    .route('/ledamoter/name')
    .get(ctrl.getLedamoterByName)

router
    .route('/ledamoter')
    .get(ctrl.getLedamoterByParams)


export default router