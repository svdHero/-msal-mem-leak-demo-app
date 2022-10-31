import { Failure, Initial, LazyResult, Loading, Success } from "lemons"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AuthenticatedFragment from "../../bt-auth/components/AuthenticatedFragment"
import { useIsAuthInProgress } from "../../bt-auth/hooks"
import LoadingMessage from "../components/LoadingMessage"
import Message, { MessageLevel } from "../components/Message"

function sleep(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis));
}


async function loadHeavyData(): Promise<string> {
    await sleep(3000)
    return "Hello world!"
}

function MyDevicesBox() {
    const { t } = useTranslation()
    const [heavyDataResult, setHeavyDataResult] = useState<LazyResult<string, string>>(Initial())
    const isAuthInProgress = useIsAuthInProgress()
    // ####################
    useEffect(() => {
        let isCanceled = false
        setHeavyDataResult(Loading())
        if(!isAuthInProgress){
            loadHeavyData()
            .then(token => {
                if (!isCanceled) {
                    setHeavyDataResult(Success(token))
                }
            })
            .catch(error => {
                if (!isCanceled) {
                    setHeavyDataResult(Failure(error))
                }
                console.error(error)
            })
        }
        return () => { isCanceled = true }
    }, [isAuthInProgress])
    // ####################
    return heavyDataResult.dispatch(
        () => <LoadingMessage message={t("myDevices:loading")} />,
        () => <LoadingMessage message={t("myDevices:loading")} />,
        errorMsg =>
            <Message
                level={MessageLevel.DANGER}
                title={t("myDevices:errorLoading")}
                message={errorMsg}
            />,
        heavyData =>
            <div className="container">
                <div className="box">
                    <p className="title">{t("myDevices:title")}</p>
                    <p className="subtitle">Heavy Data</p>
                    <div className="content"><p style={{wordBreak: "break-all"}}>{heavyData}</p></div>
                </div>
            </div>
    )
}

function MyDevicesScene() {
    return (
        <AuthenticatedFragment>
            <div className="container">
                <MyDevicesBox />
            </div>
        </AuthenticatedFragment>
    )
}

export default MyDevicesScene
