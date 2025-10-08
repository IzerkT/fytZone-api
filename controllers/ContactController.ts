import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'

import AsyncMd from '../middleware/async'

import * as ContactService from '../services/ContactService'

export const sendContactEmail = AsyncMd(async (req: ApiReq, res: ApiRes) => {
	await ContactService.sendContactEmail(req.body)

	res.status(200).json({ success: true })
})
