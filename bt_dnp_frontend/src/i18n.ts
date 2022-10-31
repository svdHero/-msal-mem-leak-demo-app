import i18next, { InitOptions } from "i18next"
import LanguageDetector, { DetectorOptions } from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

function init(){
    const detectorOptions: DetectorOptions = {
        order: ["cookie", "localStorage", "sessionStorage", "navigator"],
    }
    const options: InitOptions = {
        supportedLngs: ["en", "de", "zh"],
        fallbackLng: { 
            "default": ["en"]
        },
        interpolation: {
            escapeValue: false // React already prevents XSS attacks
        },
        ns: ["common", "home", "legalNotice", "myDevices", "notFound", "privacyPolicy", "userProfile"],
        defaultNS: "common",
        detection: detectorOptions,
        debug: false // process.env.NODE_ENV === "development"
    }
    
    i18next
        .use(HttpApi)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init(options)
}

export const i18n = {
    init
}
