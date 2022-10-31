import { useMsal } from "@azure/msal-react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import AuthenticatedFragment from "../../bt-auth/components/AuthenticatedFragment"
import { useEditProfileRedirect, useUserProfile, useResetPasswordRedirect } from "../../bt-auth/hooks"

function UserIdTokenBox(){
    const {t} = useTranslation()
    const { instance: msalInstance } = useMsal()
    // ####################
    const accountInfo = msalInstance.getActiveAccount()
    // ####################
    return (
        <div className="box">
            <h1 className="title">{t("userProfile:idTokenTitle")}</h1>

            <div className="container">
                <div className="table-container">
                    <table className="table is-hoverable">
                        <thead>
                            <tr>
                                <th>{t("userProfile:property")}</th>
                                <th>{t("userProfile:value")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>UserName</td>
                                <td>{accountInfo?.username}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{accountInfo?.name}</td>
                            </tr>
                            <tr>
                                <td>Environment</td>
                                <td>{accountInfo?.environment}</td>
                            </tr>
                            <tr>
                                <td>TenantId</td>
                                <td>{accountInfo?.tenantId}</td>
                            </tr>
                            <tr>
                                <td>LocalAccountId</td>
                                <td>{accountInfo?.localAccountId}</td>
                            </tr>
                            <tr>
                                <td>HomeAccountId</td>
                                <td>{accountInfo?.homeAccountId}</td>
                            </tr>
                            <tr>
                                <td>IdTokenClaims</td>
                                <td>
                                    <pre>{JSON.stringify(accountInfo?.idTokenClaims, null, 4)}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-large"/>
        </div>
    )
}

function EditProfileButton() {
    const {t} = useTranslation()
    const editProfileRedirect = useEditProfileRedirect()
    // ####################
    const handleEditProfile = () => {
        editProfileRedirect()
    }
    // ####################
    return (
        <button className="button is-primary" onClick={handleEditProfile}>
            <span className="icon">
                <i className="fas fa-edit"></i>
            </span>
            <span>{t("userProfile:editProfile")}</span>
        </button>
    )
}

function ResetPasswordButton() {
    const {t} = useTranslation()
    const resetPasswordRedirect = useResetPasswordRedirect()
    // ####################
    const handleResetPassword = () => {
        resetPasswordRedirect()
    }
    // ####################
    return (
        <button className="button is-primary" onClick={handleResetPassword}>
            <span className="icon">
                <i className="fas fa-key"></i>
            </span>
            <span>{t("userProfile:resetPassword")}</span>
        </button>
    )
}

function useShowIdTokenButton(): [boolean, JSX.Element] {
    const [isIdTokenDialogVisible, setIsIdTokenDialogVisible] = useState<boolean>(false)
    // ####################
    const toggleVisibility = () => {
        setIsIdTokenDialogVisible(!isIdTokenDialogVisible)
    }
    // ####################
    const button = (
        <button className="button is-primary" onClick={toggleVisibility}>
            <span className="icon">
                <i className="fas fa-shield-alt"></i>
            </span>
        </button>
    )
    return [isIdTokenDialogVisible, button]
}

function ProfileBox(){
    const {t} = useTranslation()
    // ####################
    const userProfile = useUserProfile()
    const [isIdTokenDialogVisible, showIdTokenButton] = useShowIdTokenButton()
    // ####################
    if(userProfile===undefined)
        return (
            <div className="box">
                <h1 className="title">{t("userProfile:title")}</h1>
                <h2 className="subtitle">{t("userProfile:profileNotAvailable")}</h2>
            </div>
        )
    else
        return (
            <Fragment>
                <div className="box">
                    <h1 className="title">{t("userProfile:title")}</h1>
                    <h2 className="subtitle">{userProfile.fullName}</h2>

                    <div className="container">
                        <div className="table-container">
                            <table className="table is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>{t("userProfile:property")}</th>
                                        <th>{t("userProfile:value")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{t("userProfile:userId")}</td>
                                        <td>{userProfile.userId}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:givenName")}</td>
                                        <td>{userProfile.givenName}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:familyName")}</td>
                                        <td>{userProfile.familyName}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:email")}</td>
                                        <td>{userProfile.email}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:country")}</td>
                                        <td>{userProfile.country}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:state")}</td>
                                        <td>{userProfile.state}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("userProfile:postalCode")}</td>
                                        <td>{userProfile.postalCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mb-large"/>
                    <div className="buttons">
                        <EditProfileButton />
                        <ResetPasswordButton/>
                        {showIdTokenButton}
                    </div>
                </div>
                { isIdTokenDialogVisible &&
                    <UserIdTokenBox/>
                }
            </Fragment>
        )
}

function UserProfileScene(){
    // ####################
    return (
        <AuthenticatedFragment>
            <ProfileBox/>
        </AuthenticatedFragment>
    )
}

export default UserProfileScene
