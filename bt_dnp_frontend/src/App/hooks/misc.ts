import React from "react"

import { routingHelperContext, RoutingHelperContext } from "../context/RoutingHelperContext"

export function useRoutingHelper(): RoutingHelperContext {
    return React.useContext(routingHelperContext)
}
