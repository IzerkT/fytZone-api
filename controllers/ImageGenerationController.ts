import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'

import AsyncMd from '../middleware/async'

import * as ImageGenerationService from '../services/ImageGenerationService'

export const generateImage = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	const data = await ImageGenerationService.generateImage(req.file)

	res.status(200).json({
		success: true,
		data,
	})
})
