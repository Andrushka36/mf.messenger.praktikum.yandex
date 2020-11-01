import { DTOModel } from '../lib/DTOModel';
import { UserRequestType } from '../models/profile';

export const profileDTO = new DTOModel<UserRequestType>('/user/profile');