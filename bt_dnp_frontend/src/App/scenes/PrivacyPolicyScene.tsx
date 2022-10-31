import { useTranslation } from "react-i18next"

function PrivacyPolicyScene() {
    const { t } = useTranslation()
    return (
        <div className="box">
            <p className="title">{t("privacyPolicy:title")}</p>
        </div>
    )
}

export default PrivacyPolicyScene
