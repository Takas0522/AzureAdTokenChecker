import { Injectable } from '@angular/core';
import { AccountInfo, AuthenticationResult, Configuration, PublicClientApplication } from '@azure/msal-browser';

@Injectable()
export class MsalService {

  private client: PublicClientApplication;
  private account: AccountInfo;

  constructor() { }

  clinetInit(config: Configuration): void {
    this.client = new PublicClientApplication(config);
  }

  async loginPopup(scopes: string[]): Promise<AuthenticationResult> {
    if (this.client == null) {
      alert('client not init');
      return;
    }
    return this.client.loginPopup().then(
      res => {
        this.account = res.account;
        return res;
      }
    );
  }

  async acquireToken(scopes: string[]): Promise<AuthenticationResult> {
    if (this.client == null) {
      alert('client not init');
      return;
    }
    return this.client.acquireTokenSilent({ scopes, account: this.account }).catch(err => {
      return this.client.acquireTokenPopup({ scopes });
    });
  }

}
