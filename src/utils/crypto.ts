import bcrypt from 'bcryptjs';

const generateHash = (password: string) => {
	const salt = bcrypt.genSaltSync(3);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

const compareHash = (password: string, hash: string) => {
	return bcrypt.compareSync(password, hash);
};

export { generateHash, compareHash };
