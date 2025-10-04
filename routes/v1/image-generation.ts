import express from 'express'

import * as ImageGenerationController from '../../controllers/ImageGenerationController'

import Uploader from '../../middleware/upload'

const router = express.Router()

router.post(
	'/generate-image',
	Uploader.single(2),
	ImageGenerationController.generateImage,
)

export default router
