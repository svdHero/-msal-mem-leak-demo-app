import { InteractionStatus } from "@azure/msal-browser"
import { useIsAuthenticated, useMsal } from "@azure/msal-react"
import { useCallback, } from "react"
import { editProfileRequest, loginRequest, resetPasswordRequest } from "./azure-auth-config"
import { acquireSilentAccessTokenFromAzure } from "./azure-auth-provider"

export function useIsAuthenticatedAzure(): boolean {
    return useIsAuthenticated()
}

export function useUserIdAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    return accountInfo?.localAccountId
}

export function useUserNameAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    return accountInfo?.username
}

export function useGivenNameAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "given_name" in claims){
        interface HasGivenName {
            given_name: string
        }
        return ((claims as unknown) as HasGivenName).given_name
    }
    return undefined
}

export function useFamilyNameAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "family_name" in claims){
        interface HasFamilyName {
            family_name: string
        }
        return ((claims as unknown) as HasFamilyName).family_name
    }
    return undefined
}

export function useEmailAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "email" in claims){
        interface HasEmail {
            email: string
        }
        return ((claims as unknown) as HasEmail).email
    }
    return undefined
}


export function useCountryAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "country" in claims){
        interface HasCountry {
            country: string
        }
        return ((claims as unknown) as HasCountry).country
    }
    return undefined
}

export function useStateAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "state" in claims){
        interface HasState {
            state: string
        }
        return ((claims as unknown) as HasState).state
    }
    return undefined
}

export function usePostalCodeAzure(): string | undefined {
    const {instance: msalInstance} = useMsal()
    const accountInfo = msalInstance.getActiveAccount()
    const claims = accountInfo?.idTokenClaims
    if(claims && "postalCode" in claims){
        interface HasPostalCode {
            postalCode: string
        }
        return ((claims as unknown) as HasPostalCode).postalCode
    }
    return undefined
}

export function useFullNameAzure(): string | undefined {
    const givenName = useGivenNameAzure() ?? ""
    const familyName = useFamilyNameAzure() ?? ""
    const fullName = (givenName + " " + familyName).trim()
    if(fullName.length > 0)
        return fullName
    else
        return undefined
}

export function useLoginRedirectAzure(){
    const {instance: msalInstance} = useMsal()
    return useCallback(()=>{msalInstance.loginRedirect(loginRequest)},[msalInstance])
}

export function useLogoutRedirectAzure(){
    const {instance: msalInstance} = useMsal()
    return useCallback(()=>{msalInstance.logoutRedirect()},[msalInstance])
}

export function useResetPasswordRedirectAzure(){
    const {instance: msalInstance} = useMsal()
    return useCallback(()=>{msalInstance.loginRedirect(resetPasswordRequest)},[msalInstance])
}

export function useEditProfileRedirectAzure(){
    const {instance: msalInstance} = useMsal()
    return useCallback(()=>{msalInstance.loginRedirect(editProfileRequest)},[msalInstance])
}

export function useIsAuthInProgressFromAzure(): boolean {
    const {inProgress} = useMsal()
    return inProgress !== InteractionStatus.None
}

export function useAcquireSilentAccessTokenFromAzure(scopes: string[]): () => Promise<string> {
    const { instance: msalInstance } = useMsal()
    const acquire = useCallback(() => acquireSilentAccessTokenFromAzure(msalInstance, scopes), [msalInstance, scopes])
    return acquire
}
