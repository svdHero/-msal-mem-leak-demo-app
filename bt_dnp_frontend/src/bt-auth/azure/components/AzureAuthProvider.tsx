import { MsalProvider } from "@azure/msal-react"
import { AuthProviderProps } from "../../components/AuthProvider"
import { msalSingleton } from "../azure-auth-provider"

function AzureAuthProvider(props: AuthProviderProps){
    return <MsalProvider instance={msalSingleton} children={props.children} />
}

export default AzureAuthProvider
