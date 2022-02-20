import jwt from 'jsonwebtoken';
import environment from '../config/environment';

export default class JWTUtils{
	static generateAccessToken(payload, options = {}) {
		const { expiresIn = '1d' } = options; // make json access token expire in one day
		return jwt.sign(payload, environment.jwtAccessTokenSecret, {expiresIn})
	}

	static generateRefreshToken(payload) {
		return jwt.sign(payload, environment.jwtRefreshTokenSecret);
	}

	static verifyAccessToken(accessToken) {
		return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
	}

	static verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, environment.jwtRefreshTokenSecret);
	}
}