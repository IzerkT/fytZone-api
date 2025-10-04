import CustomError from './CustomError'

export default {
	// UNKNOWN ERROR
	UnknownError: () =>
		new CustomError({
			messages: {
				prm: 'Unknown Error',
				scn: 'Bilinmeyen Hata',
			},
			httpCode: 500,
			code: 'E000',
		}),

	// AUTH ERROR
	AuthError: () =>
		new CustomError({
			messages: {
				scn: 'Erişim Hatası',
				prm: 'Auth Error',
			},
			httpCode: 401,
			code: 'E001',
		}),

	// USER BLOCKED
	UserBlocked: (m: string) =>
		new CustomError({
			messages: {
				scn: `Erişiminiz Kısıtlandı: ${m}`,
				prm: `Your access to the system is blocked: ${m}`,
			},
			httpCode: 401,
			code: 'E900',
		}),

	// EMAIL IS IN USE
	EmailInUse: () =>
		new CustomError({
			messages: {
				scn: 'E-posta adresi kullanımda',
				prm: 'Email is in use',
			},
			httpCode: 400,
			code: 'E004',
		}),

	// USERNAME IS IN USE
	UsernameInUse: () =>
		new CustomError({
			messages: {
				scn: 'Kullanıcı adı kullanımda',
				prm: 'Username is in use',
			},
			httpCode: 400,
			code: 'E005',
		}),

	// PASSWORD INCORRECT
	PasswordIncorrect: () =>
		new CustomError({
			messages: {
				scn: 'Parola yanlış',
				prm: 'Password incorrect',
			},
			httpCode: 400,
			code: 'E006',
		}),

	// WRONG CREDENTIALS
	WrongCredentials: () =>
		new CustomError({
			messages: {
				prm: 'Username or password is incorrect',
				scn: 'Kullanıcı adı veya parola yanlış',
			},
			httpCode: 401,
			code: 'E006',
		}),

	// USER NOT FOUND
	UserNotFound: () =>
		new CustomError({
			messages: {
				prm: 'User not found',
				scn: 'Kullanıcı bulunamadı',
			},
			httpCode: 404,
			code: 'E007',
		}),

	// FILE NOT FOUND
	FileNotFound: () =>
		new CustomError({
			messages: {
				prm: 'File not found',
				scn: 'Dosya bulunamadı',
			},
			httpCode: 404,
			code: 'E008',
		}),

	// INVALID FILE
	FileInvalid: () =>
		new CustomError({
			messages: {
				prm: 'File invalid',
				scn: 'Dosya geçersiz',
			},
			httpCode: 400,
			code: 'E009',
		}),

	// UPLOAD ERROR
	UploadError: () =>
		new CustomError({
			messages: {
				prm: 'Error while uploading',
				scn: 'Karşıya yüklerken hata oluştu',
			},
			httpCode: 500,
			code: 'E011',
		}),

	// NOT FOUND
	NotFound: () =>
		new CustomError({
			messages: {
				prm: 'Data not found',
				scn: 'Aradığınız veri bulunamadı',
			},
			httpCode: 404,
			code: 'E012',
		}),

	// BAD REQUEST
	BadRequest: (prm: string, scn: string) =>
		new CustomError({
			messages: { prm, scn },
			httpCode: 400,
			code: 'E999',
		}),
}
