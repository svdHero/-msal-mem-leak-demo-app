import React, { ReactNode } from "react"
import { appRoutes, SceneName, SceneRoute, toSceneLink, toScenePath } from "../app-routes"

export type RoutingHelperContext = Readonly<{
    appPath: string
    appRoutes: Readonly<Record<SceneName, SceneRoute>>
    getScenePath: (sceneName: SceneName) => string
    getSceneLink: (sceneName: SceneName, pathParams: Readonly<Map<string, string>>) => string
}>

export const routingHelperContext = React.createContext<RoutingHelperContext>({
    appPath: "/",
    appRoutes,
    getScenePath: (sn) => "",
    getSceneLink: (sn, pp) => "",
})

type RoutingHelperProviderProps = {
    appPath: string
    children: ReactNode
}

export function RoutingHelperProvider(props: RoutingHelperProviderProps) {
    const getScenePath = (sceneName: SceneName) => toScenePath(props.appPath, appRoutes[sceneName])
    const getSceneLink = (sceneName: SceneName, pathParams: Readonly<Map<string, string>>) => toSceneLink(props.appPath, appRoutes[sceneName], pathParams)
    return (
        <routingHelperContext.Provider value={{appPath: props.appPath, appRoutes, getScenePath, getSceneLink}}>
            {props.children}
        </routingHelperContext.Provider>
    )
}
