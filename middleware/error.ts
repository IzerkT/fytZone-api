import ApiReq from 'ApiReq'
import ApiRes from 'ApiRes'
import CustomError from '../errors/CustomError'
import { ErrorRequestHandler, NextFunction } from 'express'

function handleErr(err: CustomError, req: ApiReq, res: ApiRes, next: NextFunction) {
	console.log(err)

	// init error message
	let message = err?.message
	const code = err?.httpCode || 500

	// send response
	res.status(code).json({
		success: false,
		error: message || 'Sunucu Hatası',
		code: err?.code || 'E000',
	})
}

export default handleErr as ErrorRequestHandler
