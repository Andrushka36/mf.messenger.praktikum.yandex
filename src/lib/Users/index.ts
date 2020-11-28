import { UserType } from '../../models/profile';
import { userDTO } from '../../api/userDTO';
import { convertFromAPIResponse } from '../../utils/convertAPIResponse';

export class Users {
    private _promises: Record<number, Promise<UserType>> = {};

    private _fetchUser(id: number) {
        return userDTO
            .get(id)
            .find()
            .then((res: any) => {
                return convertFromAPIResponse<UserType>(res);
            });
    }

    get(id: number): Promise<UserType> {
        if (id in this._promises) {
            return this._promises[id];
        }

        const promise = this._fetchUser(id);

        this._promises[id] = promise;

        return promise;
    }
}

export const users = new Users();
