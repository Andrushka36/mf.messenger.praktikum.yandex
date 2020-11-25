import { UserResponseType } from '../../models/profile';
import { userDTO } from '../../api/userDTO';

export class Users {
    private _promises: Record<number, Promise<UserResponseType>> = {};

    private _fetchUser(id: number) {
        return userDTO
            .get(id)
            .find()
            .then((res: any) => {
                return JSON.parse(res) as UserResponseType;
            });
    }

    get(id: number): Promise<UserResponseType> {
        if (id in this._promises) {
            return this._promises[id];
        }

        const promise = this._fetchUser(id);

        this._promises[id] = promise;

        return promise;
    }
}

export const users = new Users();
