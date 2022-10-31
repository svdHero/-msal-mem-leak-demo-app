import AzureAuthenticatedFragment from "../azure/components/AzureAuthenticatedFragment"

export type AuthenticatedFragmentProps = {
    promptForSignIn?: boolean,
    children: React.ReactNode
}

function AuthenticatedFragment(props: AuthenticatedFragmentProps){
    return <AzureAuthenticatedFragment {...props}/>
}

export default AuthenticatedFragment
