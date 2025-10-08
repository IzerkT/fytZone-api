import * as Mailer from '../utils/Mailer'
import EmailConfigs from '../config/EmailConfigs.json'

export const sendContactEmail = async (data: any) => {
	const { email, message } = data

	const mailOptions = {
		from: `${EmailConfigs.from.name} <${EmailConfigs.from.address}>`,
		to: 'aturkmen.13100@gmail.com',
		subject: `New Contact Form Submission from ${EmailConfigs.from.name}`,
		text: `Email: ${email}\n\nMessage:\n${message}`,
	}

	await Mailer.sendMail(mailOptions)
}
