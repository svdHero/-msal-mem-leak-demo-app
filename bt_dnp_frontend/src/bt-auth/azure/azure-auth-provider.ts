import { AccountInfo, AuthError, EventMessage, EventType, InteractionRequiredAuthError, IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser"
import i18next from "i18next"
import { b2cConfiguration, msalConfig, resetPasswordRequest } from "./azure-auth-config"

export const msalSingleton: IPublicClientApplication = new PublicClientApplication(msalConfig)

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalSingleton.getAllAccounts()
if (accounts.length > 0) {
    msalSingleton.setActiveAccount(accounts[0])
}

// Compare https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2084#issuecomment-675013771
type IdTokenClaims = { 
    tfp: string
}

msalSingleton.addEventCallback((event: EventMessage) => {
    console.debug("Event \""+event.eventType+"\" received.")
    if (event.eventType === EventType.LOGIN_FAILURE) {
        /**
         * Gets triggered when user clicks on "forgot password" button in Microsoft Login Page.
         * Microsoft only redirects to application, but does NOT execute any userflow. This has
         * to be done by the application.
         * See https://github.com/Azure-Samples/active-directory-b2c-javascript-msal-singlepageapp/issues/9
         * and https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/1245
         */ 
        if (event.error && event.error instanceof AuthError && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
            console.debug("Invoking B2C password reset policy...")
            msalSingleton.loginRedirect(resetPasswordRequest)
        }
    }

    if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS){
        if(event.payload){
            /**
             * We need to reject id tokens that were not issued with the default sign-in policy.
             * The "tfp" claim in the token tells us what policy is used.
             * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
             */
            if("idTokenClaims" in event.payload && event.payload.idTokenClaims){
                const idTokenClaims = event.payload.idTokenClaims as IdTokenClaims
                if (idTokenClaims.tfp === b2cConfiguration.policies.resetPassword.name) {
                    window.alert(i18next.t("authDialog:resetPasswordSuccessful")+"\n"+i18next.t("authDialog:resetPasswordSignInNotice"))
                    console.debug("Invoking B2C logout due to password reset policy...")
                    msalSingleton.logoutRedirect();
                } else if (idTokenClaims.tfp === b2cConfiguration.policies.editProfile.name) {
                    window.alert(i18next.t("authDialog:editProfileSuccessful")+"\n"+i18next.t("authDialog:editProfileSignInNotice"))
                    console.debug("Invoking B2C logout due to edit profile policy...")
                    msalSingleton.logoutRedirect()
                }
            }

            if("account" in event.payload && event.payload.account){
                console.debug("Handling event \""+event.eventType+"\"...")
                const account: AccountInfo = event.payload.account
                console.debug("Login successful. Setting account information...")
                msalSingleton.setActiveAccount(account)
                console.debug("Account information set.")
                console.debug("All accounts: " + msalSingleton.getAllAccounts().map(a => a.homeAccountId).join(", "))
                console.debug("Active account: " + msalSingleton.getActiveAccount()?.homeAccountId)
            }
        }
    }
})

export async function acquireSilentAccessTokenFromAzure(msalInstance: IPublicClientApplication, scopes: string[]): Promise<string>{
    console.debug("Acquiring silent access token...")
    console.debug("All accounts: " + msalSingleton.getAllAccounts().map(a => a.homeAccountId).join(", "))
    console.debug("Active account: " + msalSingleton.getActiveAccount()?.homeAccountId)
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw new Error("No active account! Verify a user has been signed in and msalInstance.setActiveAccount has been called.")
    }
    const request = {
        scopes,
        account: account
    }
    try{
        const accessToken = (await msalInstance.acquireTokenSilent(request)).accessToken
        console.debug("Access Token acquired:")
        console.debug(accessToken)
        return accessToken
    } catch (error){
        if (error instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails:
            await msalInstance.acquireTokenRedirect(request)
            throw new Error("The acquireTokenRedirect method did not trigger a redirect. This should never happen!")
        } else {
            console.error(error)
            throw error
        }
    }

}
