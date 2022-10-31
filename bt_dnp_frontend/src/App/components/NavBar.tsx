import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useFullName, useGivenName, useIsAuthenticated, useLogoutRedirect } from "../../bt-auth/hooks"
import btLogo from "../images/logo.png"
import LanguageSelectBox from "./LanguageSelectBox"
import SignInButton from "./SignInButton"

function SignOutLink() {
    const {t} = useTranslation()
    const logoutRedirect = useLogoutRedirect()
    // ####################
    const handleSignOut = () => logoutRedirect()
    // ####################
    return (
        <div className="container">
            <Link className="navbar-item" to="#log-out" onClick={handleSignOut}>
                <span className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="subtitle is-6">{t("navBar.navItems.userMenu.signOut")}</span>
            </Link>
        </div>
    )
}

type NavBarProps = {
    navLinks: {
        home: string,
        myDevices: string,
        userProfile: string
    }
}

function NavBar(props: NavBarProps) {
    const {t} = useTranslation()
    const isAuthenticated = useIsAuthenticated()
    // ####################
    const userGivenName = useGivenName() ?? "unknown"
    const userFullName = useFullName() ?? "unknown"
    // ####################
    const [showMenu, setShowMenu] = useState(false)
    const burgerClicked = () => { setShowMenu(it => !it) }
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item has-text-weight-bold has-text-dark" to={props.navLinks.home}>
                        <img src={btLogo} alt="Company logo"/>
                    </Link>
                    <div className={`navbar-burger burger ${showMenu && "is-active"}`} onClick={burgerClicked}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={`navbar-menu ${showMenu && "is-active"}`}>
                    <div className="navbar-start">
                        {isAuthenticated &&
                            <Link className="navbar-item" to={props.navLinks.myDevices}>
                                <span className="icon">
                                    <i className="fas fa-tags"></i>
                                </span>
                                <span className="subtitle is-5">&nbsp;{t("navBar.navItems.myDevices")}</span>
                            </Link>
                        }
                        <Link className="navbar-item" to={props.navLinks.home}>
                                <span className="icon">
                                    <i className="fas fa-search"></i>
                                </span>
                                <span className="subtitle is-5">&nbsp;{t("navBar.navItems.searchDevices")}</span>
                        </Link>
                    </div>
                    <div className="navbar-end">
                        {isAuthenticated &&
                            <div className="navbar-item has-dropdown is-hoverable">
                                <Link className="navbar-link" to={props.navLinks.userProfile}>
                                    <span className="icon">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span className="subtitle is-6">{userGivenName}</span>
                                </Link>
                                <div className="navbar-dropdown is-boxed is-right">
                                    <div className="navbar-item">
                                        <span className="subtitle is-7">{t("navBar.navItems.userMenu.loggedInAs")}&nbsp;<strong>{userFullName}</strong></span>
                                    </div>
                                    <hr className="navbar-divider"></hr>
                                    <Link className="navbar-item" to={props.navLinks.userProfile}>
                                        <span className="icon">
                                            <i className="fas fa-id-card"></i>
                                        </span>
                                        <span className="subtitle is-6">{t("navBar.navItems.userMenu.profile")}</span>
                                    </Link>
                                    <hr className="navbar-divider"></hr>
                                    <SignOutLink />
                                </div>
                            </div>
                        }
                        {!isAuthenticated &&
                            <div className="navbar-item">
                                <SignInButton/>
                            </div>
                        }
                        <div className="navbar-item">
                            <LanguageSelectBox/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
