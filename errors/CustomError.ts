export default class CustomError extends Error {
	messages: any
	httpCode: number
	code: any
	errors: Error[]

	constructor(props: any) {
		const { messages, httpCode, code } = props
		super(messages?.prm || messages?.scn)
		this.messages = messages
		this.httpCode = httpCode
		this.code = code
		this.errors = []
		Error.captureStackTrace(this, this.constructor)
	}
}
