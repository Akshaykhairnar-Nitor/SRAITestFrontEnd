import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: '19c4163c-fc5b-45ce-8500-b2b6762a95fc', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}

export const protectedResources = {
  todoListApi: {
    endpoint: "https://localhost:44353/",
    scopes: ["api://f287f58d-26a5-428a-874a-285820f0e8e1/empDirectory"],
  },
}

export const loginRequest = {
  scopes: ["User.Read"]
};