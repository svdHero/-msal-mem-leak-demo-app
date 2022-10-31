import { Failure, Initial, LazyResult, Loading, Success } from "lemons"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AuthenticatedFragment from "../../bt-auth/components/AuthenticatedFragment"
import { useAcquireDnpAccessToken, useIsAuthInProgress } from "../../bt-auth/hooks"
import LoadingMessage from "../components/LoadingMessage"
import Message, { MessageLevel } from "../components/Message"

function MyDevicesBox() {
    const { t } = useTranslation()
    const [accessTokenResult, setAccessTokenResult] = useState<LazyResult<string, string>>(Initial())
    const isAuthInProgress = useIsAuthInProgress()
    const acquireDnpAccessToken = useAcquireDnpAccessToken()

    // ####################
    useEffect(() => {
        let isCanceled = false
        if(isAuthInProgress){
            if(!isCanceled){
                setAccessTokenResult(Loading())
            }
        } else {
            acquireDnpAccessToken()
            .then(token => {
                if (!isCanceled) {
                    setAccessTokenResult(Success(token))
                }
            })
            .catch(error => {
                if (!isCanceled) {
                    console.error(error)
                    setAccessTokenResult(Failure(error))
                }
            })
        }
        return () => { isCanceled = true }
    }, [isAuthInProgress, acquireDnpAccessToken])
    // ####################
    return accessTokenResult.dispatch(
        () => <LoadingMessage message={t("myDevices:loading")} />,
        () => <LoadingMessage message={t("myDevices:loading")} />,
        errorMsg =>
            <Message
                level={MessageLevel.DANGER}
                title={t("myDevices:errorLoading")}
                message={errorMsg}
            />,
        accessToken =>
            <div className="container">
                <div className="box">
                    <p className="title">{t("myDevices:title")}</p>
                    <p className="subtitle">Access Token</p>
                    <div className="content"><p style={{wordBreak: "break-all"}}>{accessToken}</p></div>
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
