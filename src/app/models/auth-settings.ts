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
