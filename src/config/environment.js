export default {
	port: parseInt(process.env.PORT) || 8080,
	nodeEnv: process.env.NODE_ENV || 'production',
	saltRounds: parseInt(process.env.SALT_ROUNDS) || 10, // This line is for the bcrypt algorithm; tells the difficulty of hashing function, if number is higher, the opperation will be slower to hash a password
	jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'd6f1649873791d816e94328ad4e5f20f267b61bf63c77d4e18da1347e9fc71bd',
	jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '24ffd98a0c09bd007cd8f5ac0e980bd610c463ee19582c0b1336df01283fb051'
};