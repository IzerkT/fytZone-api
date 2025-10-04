import { GoogleGenAI, Part } from '@google/genai'

import * as FsUtils from '../utils/FsUtils'

const ai = new GoogleGenAI({
	apiKey: process.env.GOOGLE_API_KEY || '',
	apiVersion: 'v1alpha',
})

export const generateImage = async (f: any) => {
	const image = FsUtils.toBase64(f.buffer)

	if (!image) {
		throw new Error('Image file is required')
	}

	const prompt = `
        Based on the attached image of the room, apply the following change:
        Without altering the structure or architecture of the room (like walls or windows), integrate a complete set of high-quality weightlifting equipment, including a power rack, an adjustable bench, a full set of dumbbells, and rubber flooring, to create a functional and aesthetically pleasing home gym. 
    `

	const imagePart: Part = {
		inlineData: {
			data: image,
			mimeType: f.mimetype,
		},
	}
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash-image',
		contents: [imagePart, prompt],
		config: {
			responseModalities: ['IMAGE', 'TEXT'],
		},
	})

	console.log('Generation response:', response)

	const candidates = response.candidates
	if (candidates && candidates[0]?.content?.parts) {
		for (const part of candidates[0].content.parts) {
			if (part.text) {
				console.log(part.text)
			} else if (part.inlineData) {
				const imageData = part.inlineData.data
				if (typeof imageData === 'string') {
					const buffer = Buffer.from(imageData, 'base64')
					FsUtils.save('public/gemini-native-image.png', buffer)
					return buffer
				}
				console.warn('No image data found in inlineData.')
			}
		}
	} else {
		console.warn('No candidates or parts found in response.')
	}
}
