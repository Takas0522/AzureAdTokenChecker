import { Configuration } from '@azure/msal-browser';

export interface IAuthSetting {
    index: number;
    clientId: string;
    tenant: string;
    scopes: Scope[];
}

export interface Scope {
    scope: string;
}

export class AuthSetting implements IAuthSetting {
    index = 0;
    clientId = '';
    tenant = '';
    scopes: Scope[] = [];

    constructor(data: IAuthSetting) {
        this.index = data.index;
        this.clientId = data.clientId;
        this.tenant = data.tenant;
        this.scopes = data.scopes;
    }

    generateMsalSettings(): Configuration {
        return {
            auth: {
                clientId: this.clientId,
                authority: `https://login.microsoftonline.com/${this.tenant}/`,
                redirectUri: location.origin
            }
        };
    }
}
