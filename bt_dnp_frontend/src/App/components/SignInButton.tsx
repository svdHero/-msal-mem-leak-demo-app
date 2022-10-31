import { useTranslation } from "react-i18next"
import { useLoginRedirect } from "../../bt-auth/hooks"

type SignInButtonProps = {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SignInButton(props: SignInButtonProps) {
    const {t} = useTranslation()
    const loginRedirect = useLoginRedirect()
    // ####################
    const handleSignIn = () => {
        // console.warn("Before Login REDIRECT");
        loginRedirect()
        // console.warn("After Login REDIRECT");
    }
    // ####################
    return (
        <div className="container">
            <button className="button is-primary" onClick={handleSignIn}>
                <span className="icon">
                    <i className="fas fa-sign-in-alt"></i>
                </span>
                <span>{t("navBar.signIn")}</span>
            </button>
        </div>
    )
}

export default SignInButton
