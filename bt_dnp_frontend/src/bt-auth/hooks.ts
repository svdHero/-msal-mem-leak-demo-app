import { backEndConfig } from "./azure/azure-auth-config"
import { useAcquireSilentAccessTokenFromAzure, useEditProfileRedirectAzure, useGivenNameAzure, useFamilyNameAzure, useFullNameAzure, useIsAuthenticatedAzure, useIsAuthInProgressFromAzure, useLoginRedirectAzure, useLogoutRedirectAzure, useResetPasswordRedirectAzure, useUserIdAzure, useUserNameAzure, useEmailAzure, useCountryAzure, useStateAzure, usePostalCodeAzure } from "./azure/hooks"

function isUndefinedOrNullOrWhitespace(str: string|undefined|null): boolean {
    return (!str || str.trim().length===0);
}

function trimToUndefined(str: string | undefined | null): string | undefined{
    return isUndefinedOrNullOrWhitespace(str) ? undefined : str?.trim() as string
}

export function useAcquireSilentAccessToken(scopes: string[]): () => Promise<string> {
    return useAcquireSilentAccessTokenFromAzure(scopes)
}

export function useAcquireDnpAccessToken(): () => Promise<string>{
    return useAcquireSilentAccessToken(backEndConfig.accessTokenScopes)
}

// export function useAcquireMsGraphAccessToken(): () => Promise<string>{
//     return useAcquireSilentAccessToken(msGraphConfig.accessTokenScopes)
// }

export function useIsAuthInProgress(): boolean {
    return useIsAuthInProgressFromAzure()
}

export function useIsAuthenticated(): boolean {
    return useIsAuthenticatedAzure()
}

export function useUserId(): string | undefined {
    return trimToUndefined(useUserIdAzure())
}

export function useUserName(): string | undefined {
    return trimToUndefined(useUserNameAzure())
}

export function useGivenName(): string | undefined {
    return trimToUndefined(useGivenNameAzure())
}

export function useFamilyName(): string | undefined {
    return trimToUndefined(useFamilyNameAzure())
}

export function useFullName(): string | undefined {
    return trimToUndefined(useFullNameAzure())
}

export function useEmail(): string | undefined {
    return trimToUndefined(useEmailAzure())
}

export function useCountry(): string | undefined {
    return trimToUndefined(useCountryAzure())
}

export function useState(): string | undefined {
    return trimToUndefined(useStateAzure())
}

export function usePostalCode(): string | undefined {
    return trimToUndefined(usePostalCodeAzure())
}

export type UserProfile = Readonly<{
    userId: string
    givenName?: string
    familyName?: string
    fullName?: string
    email?: string
    country?: string
    state?: string
    postalCode?: string
}>

export function useUserProfile(): UserProfile | undefined{
    const userId = useUserId()
    const givenName = useGivenName()
    const familyName = useFamilyName()
    const fullName = useFullName()
    const email = useEmail()
    const country = useCountry()
    const state = useState()
    const postalCode = usePostalCode()
    if(!userId){
        return undefined
    }
    return {
        userId,
        givenName,
        familyName,
        fullName,
        email,
        country,
        state,
        postalCode
    }
}

export function useLoginRedirect(){
    return useLoginRedirectAzure()
}

export function useLogoutRedirect(){
    return useLogoutRedirectAzure()
}
export function useResetPasswordRedirect(){
    return useResetPasswordRedirectAzure()
}

export function useEditProfileRedirect(){
    return useEditProfileRedirectAzure()
}
