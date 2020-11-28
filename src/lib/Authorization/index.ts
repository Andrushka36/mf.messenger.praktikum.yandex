import { authUserDTO } from '../../api/authUserDTO';
import { userStore } from '../../stores';
import { convertFromAPIResponse } from '../../utils/convertAPIResponse';
import { UserType } from '../../models/profile';

export class Authorization {
    static __instance: Authorization;

    private _isAuthorized: boolean = true;

    constructor(
        private _request: () => Promise<any>,
    ) {
        if (Authorization.__instance) {
            return Authorization.__instance;
        }

        Authorization.__instance = this;
    }

    public check() {
        this._isAuthorized = false;

        return this._request()
            .then(() => {
                this._isAuthorized = true;
            });
    }

    public isAuthorized() {
        return this._isAuthorized;
    }

    public logout() {
        this._isAuthorized = false;
    }
}

export const authorization = new Authorization(
    () => authUserDTO
        .find()
        .then(data => convertFromAPIResponse<UserType>(data))
        .then(users => {
            userStore.setData({ ...users });
        })
);
