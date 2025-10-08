import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'

import * as FsUtils from './utils/FsUtils'

// Routers
import ImageGenerationRouter from './routes/v1/image-generation'
import ContactRouter from './routes/v1/contact'

// Error Middleware
import ErrorMd from './middleware/error'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56,
})

function start() {
	// init app
	const app = express()

	// set CORS
	app.use(cors())

	// apply rate limiter to all requests
	app.use(limiter)

	// set express options
	app.use(express.json()) // Parse JSON bodies
	app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

	// register routers
	app.use('/api/v1/image-generation', ImageGenerationRouter)
	app.use('/api/v1/contact', ContactRouter)

	// serve public folder
	app.use('/api/v1/public', express.static(FsUtils.path('public')))

	// use custom error handler
	app.use(ErrorMd)

	// get port
	const port = process.env.DEFAULT_PORT || process.env.PORT

	// start app
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log('Service running on port', port)
	})
}

start()
