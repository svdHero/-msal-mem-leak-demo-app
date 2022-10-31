function removeTrailingSlashes(url: string): string {
    const trailingSlashes = /\/+$/
    return url.replace(trailingSlashes, "")
}

export type SceneName = "Home" | "UserProfile" | "MyDevices" | "LegalNotice" | "PrivacyPolicy"

export type BreadcrumbLabel = Readonly<{
    i18nKey: string,
    i18nParams: Readonly<Map<string, string>>, // Map from i18nParamKey to pathParamKey
}>

export type SceneRoute = Readonly<{
    name: SceneName,
    label: BreadcrumbLabel,
    path: string,
}>

function replaceParamsInScenePath(route: SceneRoute, pathParams: Readonly<Map<string, string>>): SceneRoute{
    if(pathParams.size===0)
        return route

    const { label, path, ...rest } = route
    const newI18nParams =
        Array.from(label.i18nParams.entries()).reduce(
            (i18nParamsAcc, i18nParamEntry) => i18nParamsAcc.set(i18nParamEntry[0], pathParams.get(i18nParamEntry[1]) as string),
            new Map<string, string>()
        )
    const newLabel: BreadcrumbLabel = {...label, i18nParams: newI18nParams}
    const newPath =
        Array.from(pathParams.keys()).reduce(
            (pathAcc, paramKey) => pathAcc.replace(`:${paramKey}`, pathParams.get(paramKey) as string),
            path
        )
    return {label: newLabel, path: newPath, ...rest}
}

export function createBreadcrumbs (routes: readonly SceneRoute[], matchPath: string, matchParams: Readonly<Map<string, string>>): readonly SceneRoute[] {
    // Get all scenes that are contained in the current one.
    // Swap out any dynamic routes with their param values.
    // E.g. "/users/:userId" will become "/users/47"
    const crumbs =
        routes
        .filter(scene => matchPath.includes(scene.path))
        .map(scene => replaceParamsInScenePath(scene, matchParams))
    return crumbs
}

export const appRoutes: Readonly<Record<SceneName, SceneRoute>> = {
    Home:               {name: "Home",                  path: "/",                                                  label: {i18nKey: "home:breadcrumb",                 i18nParams: new Map()                              }   },
    UserProfile:        {name: "UserProfile",           path: "/user-profile" ,                                     label: {i18nKey: "userProfile:breadcrumb",          i18nParams: new Map()                              }   },
    MyDevices:          {name: "MyDevices",             path: "/my-devices",                                        label: {i18nKey: "myDevices:breadcrumb",            i18nParams: new Map()                              }   },
    LegalNotice:        {name: "LegalNotice",           path: "/legal-notice",                                      label: {i18nKey: "legalNotice:breadcrumb",          i18nParams: new Map()                              }   },
    PrivacyPolicy:      {name: "PrivacyPolicy",         path: "/privacy-policy",                                    label: {i18nKey: "privacyPolicy:breadcrumb",        i18nParams: new Map()                              }   },
} as const

export function toScenePath(appPath: string, sceneRoute: SceneRoute): string {
    return `${removeTrailingSlashes(appPath)}${sceneRoute.path}`
}

export function toSceneLink(appPath: string, sceneRoute: SceneRoute, pathParams: Readonly<Map<string, string>>): string {
    return `${removeTrailingSlashes(appPath)}${replaceParamsInScenePath(sceneRoute, pathParams).path}`
}
