import { DTOModel } from '../lib/DTOModel';
import { SignUpType } from '../models/signUp';

export const signUpDTO = new DTOModel<SignUpType>('/auth/signup');
