import { useTranslation } from "react-i18next"

function HomeScene() {
    const { t, i18n } = useTranslation()
    // ####################
    const currentLanguage = i18n.language
    console.debug(`Current language is ${currentLanguage}`)
    console.debug(`Browser languages are [${navigator.languages.join(", ")}]`)
    // ####################
    return (
        <div className="container">
            <div className="box">
                <p className="title">{t("home:title")}</p>
                <p className="subtitle">{t("home:subtitle")}</p>
                <p className="content">{t("home:welcome")}</p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="box"></div>
                </div>
                <div className="column">
                    <div className="box"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeScene
