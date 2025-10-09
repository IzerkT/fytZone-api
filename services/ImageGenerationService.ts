import { GoogleGenAI, Part } from '@google/genai'

import * as FsUtils from '../utils/FsUtils'

const ai = new GoogleGenAI({
	apiKey: process.env.GOOGLE_API_KEY || '',
	apiVersion: 'v1alpha',
})

const prompts = {
	Bodybuilding: `
    Based on the attached image of the room, apply the following change:
    Without altering the structure or architecture of the room (like walls or windows), 
    integrate a complete set of high-quality weightlifting equipment. This should include 
    a power rack with a barbell, an adjustable bench, and a full set of dumbbells on a rack.
    Install durable, black rubber flooring in the workout area. Incorporate ample mirror space,
    such as a large wall mirror or a series of smaller ones, to help with form. For the environment, 
    add a touch of greenery like a tall potted plant or some wall-mounted succulents to add life to the space. 
    Ensure the lighting is bright and focused, creating a motivating and energetic atmosphere.
  `,
	Cardio: `
    Based on the attached image of the room, apply the following change:
    Without altering the structure or architecture of the room, transform the space into
    a modern cardio zone. Introduce a high-end treadmill, a stationary bike, and a rowing machine,
    arranged with enough space to move between them. Keep a significant area open for floor exercises.
    Place some form of large potted plant, like a monstera or a bird of paradise, near a window to create a fresh, airy feel. 
    For entertainment and convenience, incorporate a modern feature such as a wall-mounted smart TV or a premium sound system, 
    alongside a hydration station like a sleek water cooler or a built-in filtered water tap. The lighting should be bright and energizing throughout the room.
  `,
	'Yoga / Pilates': `
    Based on the attached image of the room, apply the following change:
    Without altering the structure or architecture of the room, create a serene and minimalist 
    yoga and Pilates studio. Lay down light-colored, high-quality yoga mats and include a dedicated 
    space for a Pilates reformer. Arrange for neat storage of accessories like yoga blocks and straps, 
    perhaps on a simple wooden shelf or in woven baskets. Enhance the calming environment with elements 
    of nature, which could include hanging plants, a small, tranquil water feature, or natural wood accents. 
    The room should feel filled with soft, natural light, creating a peaceful and restorative sanctuary.
  `,
	'CrossFit / Calisthenics': `
    Based on the attached image of the room, apply the following change:
    Without altering the structure or architecture of the room, convert it into a functional 
    CrossFit and calisthenics gym. Install a sturdy wall-mounted pull-up bar and hang gymnastic rings. 
    Equip the space with a set of kettlebells of varying weights, a plyometric box, and a battle rope. 
    The flooring should be heavy-duty, shock-absorbent rubber. For the environment, maintain a raw, 
    energetic aesthetic. Include a method for tracking workouts, such as a large whiteboard or a chalkboard wall.
    Add a resilient plant in a sturdy pot, like a snake plant or ZZ plant, to complement the rugged style.
  `,
}

const getPromptForActivity = (activity: string) => {
	return prompts[activity as keyof typeof prompts] || prompts.Bodybuilding
}

export const generateImage = async (file: any, activity: string) => {
	const b64 = file.buffer.toString('base64')
	const prompt = getPromptForActivity(activity)

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash-image',
		contents: [{ inlineData: { data: b64, mimeType: file.mimetype } }, prompt],
		config: { responseModalities: ['IMAGE', 'TEXT'] },
	})

	const candidates = response.candidates

	if (candidates && candidates[0]?.content?.parts) {
		for (const part of candidates[0].content.parts) {
			if (part.inlineData) {
				const imageData = part.inlineData.data
				if (typeof imageData === 'string') {
					const buffer = Buffer.from(imageData, 'base64')
					return buffer
				}
			}
		}
	}
}
