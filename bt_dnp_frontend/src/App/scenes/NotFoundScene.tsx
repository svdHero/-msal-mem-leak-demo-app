import { useTranslation } from "react-i18next"

function NotFoundScene(){
    const { t } = useTranslation()
    // ####################
    return (
        <article className="message is-warning">
            <div className="message-header">
                <p>
                    <span className="icon">
                        <i className="fas fa-jedi"></i>
                    </span>
                    {t("notFound:noPageHere")}
                </p>
            </div>
            <div className="message-body">
                {t("notFound:yoda")}
            </div>
        </article>
    )
}

export default NotFoundScene
