import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'

import AsyncMd from '../middleware/async'

import * as ImageGenerationService from '../services/ImageGenerationService'

export const generateImage = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const file = req.file
	const activity = req.body.activity
	const buffer = await ImageGenerationService.generateImage(file, activity)
	res.status(200).send(buffer)
})
