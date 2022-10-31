import { UnauthenticatedTemplate } from "@azure/msal-react"
import { UnauthenticatedFragmentProps } from "../../components/UnauthenticatedFragment"

function AzureUnauthenticatedFragment(props: UnauthenticatedFragmentProps){
    return <UnauthenticatedTemplate children={props.children} />
}

export default AzureUnauthenticatedFragment
