import express from 'express'

import * as ContactController from '../../controllers/ContactController'

const router = express.Router()

router.post('/', ContactController.sendContactEmail)

export default router
