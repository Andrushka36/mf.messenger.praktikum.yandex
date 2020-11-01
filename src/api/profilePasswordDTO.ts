import { DTOModel } from '../lib/DTOModel';
import { ChangePasswordRequestType } from '../models/profile';

export const profilePasswordDTO = new DTOModel<ChangePasswordRequestType>('/user/password')