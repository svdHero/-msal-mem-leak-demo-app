import { Redirect, Route, Switch } from "react-router-dom"

import Breadcrumb from "./components/Breadcrumb"
import MyDevicesScene from "./scenes/MyDevicesScene"
import NotFoundScene from "./scenes/NotFoundScene"
import UserProfileScene from "./scenes/UserProfileScene"
import HomeScene from "./scenes/HomeScene"
import { useRoutingHelper } from "./hooks/misc"
import LegalNoticeScene from "./scenes/LegalNoticeScene"
import PrivacyPolicyScene from "./scenes/PrivacyPolicyScene"

function SceneSwitch() {
    let { getScenePath } = useRoutingHelper()
    // ####################
    return(
        <Switch>
            <Redirect from="/from-bt-devices/:serviceTag" to="/device/:serviceTag" />
            <Route exact path={getScenePath("Home")}>
                <HomeScene/>
            </Route>
            <Route exact path={getScenePath("UserProfile")}>
                <Breadcrumb/>
                <UserProfileScene/>
            </Route>
            <Route exact path={getScenePath("MyDevices")}>
                <Breadcrumb/>
                <MyDevicesScene/>
            </Route>
            <Route exact path={getScenePath("LegalNotice")}>
                <Breadcrumb/>
                <LegalNoticeScene/>
            </Route>
            <Route exact path={getScenePath("PrivacyPolicy")}>
                <Breadcrumb/>
                <PrivacyPolicyScene/>
            </Route>
            <Route path="*">
                <NotFoundScene/>
            </Route>
        </Switch>
    )
}

export default SceneSwitch
