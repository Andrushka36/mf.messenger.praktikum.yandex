import { DTOModel } from '../lib/DTOModel';
import { UserAvatarType } from '../models/profile';

export const profileAvatarDTO = new DTOModel<UserAvatarType>('/user/profile/avatar');