import AzureUnauthenticatedFragment from "../azure/components/AzureUnauthenticatedFragment"

export type UnauthenticatedFragmentProps = {
    children: React.ReactNode
}

function UnauthenticatedFragment(props: UnauthenticatedFragmentProps){
    return <AzureUnauthenticatedFragment {...props}/>
}

export default UnauthenticatedFragment
