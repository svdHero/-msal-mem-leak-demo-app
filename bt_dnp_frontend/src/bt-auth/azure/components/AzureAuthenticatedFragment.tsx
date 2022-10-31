import { InteractionType } from "@azure/msal-browser"
import { AuthenticatedTemplate, MsalAuthenticationTemplate } from "@azure/msal-react"
import { AuthenticatedFragmentProps } from "../../components/AuthenticatedFragment"
import { loginRequest } from "../azure-auth-config"

function AzureAuthenticatedFragment(props: AuthenticatedFragmentProps){
    // const promptForSignIn = props.promptForSignIn ?? true
    const promptForSignIn = props.promptForSignIn ?? true
    if(promptForSignIn)
        return <MsalAuthenticationTemplate authenticationRequest={loginRequest} interactionType={InteractionType.Redirect} children={props.children}/>
    else
        return <AuthenticatedTemplate children={props.children} />
}

export default AzureAuthenticatedFragment
