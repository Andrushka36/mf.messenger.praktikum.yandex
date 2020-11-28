import { DTOModel } from '../lib/DTOModel';
import { SignUpRequestType } from '../models/signUp';

export const signUpDTO = new DTOModel<SignUpRequestType>('/auth/signup');
