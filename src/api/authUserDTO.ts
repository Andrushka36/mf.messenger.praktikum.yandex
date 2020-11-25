import { DTOModel } from '../lib/DTOModel';
import { UserRequestType, UserAvatarType } from '../models/profile';

export const authUserDTO = new DTOModel<UserRequestType & UserAvatarType>('/auth/user');
