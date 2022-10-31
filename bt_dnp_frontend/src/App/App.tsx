import { useRouteMatch } from "react-router-dom"

import "./App.scss"
import Footer from "./components/Footer"
import SceneSwitch from "./SceneSwitch"
import NavBar from "./components/NavBar"
import { appRoutes, toScenePath } from "./app-routes"
import { RoutingHelperProvider } from "./context/RoutingHelperContext"

function App() {
    let match = useRouteMatch()
    // ####################
    const appPath = match.path
    const navLinks = {
        home: toScenePath(appPath, appRoutes.Home),
        myDevices: toScenePath(appPath, appRoutes.MyDevices),
        userProfile: toScenePath(appPath, appRoutes.UserProfile)
    }
    // ####################
    return (
        <RoutingHelperProvider appPath={appPath}>
            <div id="App">
                <NavBar navLinks={navLinks} />
                <main>
                    <section className="section">
                        <div className="container">
                            <SceneSwitch/>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </RoutingHelperProvider>
    )
}

export default App
