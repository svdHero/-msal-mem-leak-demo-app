import { Configuration, LogLevel, RedirectRequest } from "@azure/msal-browser"

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent
const msie = ua.indexOf("MSIE ")
const msie11 = ua.indexOf("Trident/")
const msedge = ua.indexOf("Edge/")
const firefox = ua.indexOf("Firefox")
const isIE = msie > 0 || msie11 > 0 // eslint-disable-line @typescript-eslint/no-unused-vars
const isEdge = msedge > 0
 // Only needed if you need to support the redirect flow in Firefox incognito:
const isFirefox = firefox > 0  // eslint-disable-line @typescript-eslint/no-unused-vars

export type B2CConfiguration = Readonly<{
    authorityDomain: string,
    policies: Readonly<{
        signUpSignIn: Readonly<{
            name: string
            authority: string
        }>
        resetPassword: Readonly<{
            name: string
            authority: string
        }>
        editProfile: Readonly<{
            name: string
            authority: string
        }>
    }>
}>

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
 export const b2cConfiguration: B2CConfiguration = {
    authorityDomain: process.env.REACT_APP_AUTHORITY_DOMAIN as string,
    policies: {
        signUpSignIn: {
            name: process.env.REACT_APP_POLICY_NAME_SIGNUPSIGNIN as string,
            authority: process.env.REACT_APP_AUTHORITY_SIGNUPSIGNIN as string
        },
        resetPassword: {
            name: process.env.REACT_APP_POLICY_NAME_RESETPASSWORD as string,
            authority: process.env.REACT_APP_AUTHORITY_RESETPASSWORD as string
        },
        editProfile: {
            name: process.env.REACT_APP_POLICY_NAME_EDITPROFILE as string,
            authority: process.env.REACT_APP_AUTHORITY_EDITPROFILE as string
        },
    }
}

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID as string,
        authority: b2cConfiguration.policies.signUpSignIn.authority,
        knownAuthorities: [b2cConfiguration.authorityDomain],
        redirectUri: process.env.REACT_APP_REDIRECT_URI as string,
        navigateToLoginRequestUrl: true,
        postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI as string
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: isEdge // Set this to "true" if you are having issues on Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message)
                        return
                    case LogLevel.Info:
                        console.debug(message)
                        return
                    case LogLevel.Verbose:
                        console.debug(message)
                        return
                    case LogLevel.Warning:
                        console.warn(message)
                        return
                }
            }
        }
    }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest: RedirectRequest = {
    scopes: [
    ],
    authority: b2cConfiguration.policies.signUpSignIn.authority
}

export const resetPasswordRequest: RedirectRequest = {
    scopes: [
    ],
    authority: b2cConfiguration.policies.resetPassword.authority
}

export const editProfileRequest: RedirectRequest = {
    scopes: [
    ],
    authority: b2cConfiguration.policies.editProfile.authority
}

export const backEndConfig = {
    // see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
    accessTokenScopes: [
        `${process.env.REACT_APP_BACK_END_APP_ID_URI}/Api.AccessAsUser`
    ]
}

