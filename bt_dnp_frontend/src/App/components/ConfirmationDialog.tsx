import { ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

function sleep(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis));
}

type ConfirmationDialogProps = {
    isVisible: boolean
    title: string
    waitMillis?: number
    onOkButtonClick: ()=>void
    onCancelButtonClick: ()=>void
    children: ReactNode
}

function ConfirmationDialog(props: ConfirmationDialogProps){
    const {t} = useTranslation()
    const waitMillis = props.waitMillis ?? 4000
    const [okButtonEnabled, setOkButtenEnabled] = useState<boolean>(false)
    // ####################
    useEffect(() => {
        let isCanceled = false
        setOkButtenEnabled(false)
        sleep(waitMillis)
        .then(() => {
            if (!isCanceled) {
                setOkButtenEnabled(true)
            }
        })
        .catch(error => {
            if (!isCanceled) {
                console.error(error)
            }
        })
        return () => { isCanceled = true }
    }, [waitMillis, props.isVisible])
    // ####################
    return(
        <div className={`modal ${props.isVisible && "is-active"}`}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
                    {/* <button className="delete" onClick={props.onCloseButtonClick}></button> */}
                </header>
                <section className="modal-card-body">
                    {props.children}
                </section>
                <footer className="modal-card-foot">
                    <button className={`button ${okButtonEnabled ? "is-primary" : "is-primary is-loading"}`} disabled={!okButtonEnabled} onClick={props.onOkButtonClick}>{t("dialog.ok")}</button>
                    <button className="button is-danger" onClick={props.onCancelButtonClick}>{t("dialog.cancel")}</button>
                </footer>
            </div>            
        </div>
    )
}

export default ConfirmationDialog
