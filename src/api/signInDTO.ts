import { DTOModel } from '../lib/DTOModel';
import { SignInType } from '../models/signIn';

export const signInDTO = new DTOModel<SignInType>('/auth/signin');