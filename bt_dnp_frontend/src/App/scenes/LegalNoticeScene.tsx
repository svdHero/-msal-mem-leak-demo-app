import { useTranslation } from "react-i18next"

function LegalNoticeScene() {
    const { t } = useTranslation()
    // ####################
    return (
        <div className="box">
            <p className="title">{t("legalNotice:title")}</p>
        </div>
    )
}

export default LegalNoticeScene
