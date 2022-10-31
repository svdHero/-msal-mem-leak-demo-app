import React from "react"
import { useTranslation } from "react-i18next"
import { Link, match, useRouteMatch } from "react-router-dom"

import { appRoutes, createBreadcrumbs, SceneRoute } from "../app-routes"

type BreadcrumbViewItemProps = {
    isLastOne: boolean,
    breadcrumbItem: SceneRoute
}

function BreadcrumbViewItem(props: BreadcrumbViewItemProps) {
    const { t } = useTranslation()
    return (
        <li className={props.isLastOne ? "is-active" : ""}>
            <Link to={props.breadcrumbItem.path}>
                {t(props.breadcrumbItem.label.i18nKey, Object.fromEntries(props.breadcrumbItem.label.i18nParams.entries()))}
            </Link>
        </li>
    )
}

type BreadcrumbViewProps = {
    breadcrumbItems: readonly SceneRoute[]
}

export function BreadcrumbView(props: BreadcrumbViewProps) {
    const numItems = props.breadcrumbItems.length
    const isLastOne = (i: number) => i===numItems-1
    const listItems = props.breadcrumbItems.map((item, i) => (
            <BreadcrumbViewItem
                isLastOne={isLastOne(i)}
                breadcrumbItem={item}
                key={i}
            />
        )
    )
    // ####################
    return (
        <div className="box">
            {/* <div className="container"> */}
                <nav className="breadcrumb">
                    <ul>
                        {listItems}
                    </ul>
                </nav>
            {/* </div> */}
        </div>
    )
}

function makeCrumbs(routeMatch: match): readonly SceneRoute[]{
    const routes: readonly SceneRoute[] = Object.values(appRoutes)
    const matchPath: string = routeMatch.path
    const matchParams: Readonly<Map<string, string>> = new Map(Object.entries(routeMatch.params))
    const crumbs = createBreadcrumbs(routes, matchPath, matchParams)
    return crumbs
}

function Breadcrumb() {
    let match = useRouteMatch()
    
    const crumbs = makeCrumbs(match)
    return (
        <BreadcrumbView breadcrumbItems={crumbs}/>
    )
}

export default Breadcrumb
