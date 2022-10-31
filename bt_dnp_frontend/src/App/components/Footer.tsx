import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useRoutingHelper } from "../hooks/misc"

function Footer() {
    const {t} = useTranslation()
    const {getSceneLink} = useRoutingHelper()
    // ####################
    return (
        <footer className="footer">
            <div className="container">
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <Link to={getSceneLink("LegalNotice", new Map([]))}>
                            <span className="icon">
                                <i className="fas fa-pen-nib"></i>
                            </span>
                            <span>{t("footer.legalNotice")}</span>
                        </Link>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <span className="icon">
                                <i className="fas fa-tag"></i>
                            </span>
                            <strong>Demo App {process.env.REACT_APP_VERSION}</strong>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <Link to={getSceneLink("PrivacyPolicy", new Map([]))}>
                            <span className="icon">
                                <i className="fas fa-user-secret"></i>
                            </span>
                            <span>{t("footer.privacyPolicy")}</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
