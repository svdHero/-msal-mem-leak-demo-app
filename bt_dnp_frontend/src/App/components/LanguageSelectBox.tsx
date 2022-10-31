import { useTranslation } from "react-i18next"

function LanguageSelectBox() {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language
    const changeLanguage = (newLanguage: string) => {
        console.debug(`Changing language from ${currentLanguage} to ${newLanguage}`)
        i18n.changeLanguage(newLanguage)
    }
    return (
        <div className="control has-icons-left">
            <div className="select is-small">
                <select
                    value={currentLanguage}
                    onChange={(ev) => changeLanguage(ev.target.value)}
                >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">汉语</option>
                </select>
            </div>
            <div className="icon is-small is-left">
                <i className="fas fa-globe"></i>
                {/* <span className="flag-icon flag-icon-cn flag-icon-squared"></span> */}
            </div>
        </div>
    )
}

export default LanguageSelectBox
