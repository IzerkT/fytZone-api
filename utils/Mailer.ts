import nodemailer from 'nodemailer'

import EmailConfigs from '../config/EmailConfigs.json'

const transporter = nodemailer.createTransport({
	service: EmailConfigs.service,
	auth: {
		user: EmailConfigs.from.address,
		pass: EmailConfigs.password,
	},
})

export const sendMail = async (options: nodemailer.SendMailOptions) => {
	return transporter.sendMail(options)
}
