import ReqMeta from 'ReqMeta'
import { Request } from 'express'

export default interface ApiReq extends Request {
	body: any
	user: any
	userId: int
	isSubscribed: boolean
	rawBody: any
}
