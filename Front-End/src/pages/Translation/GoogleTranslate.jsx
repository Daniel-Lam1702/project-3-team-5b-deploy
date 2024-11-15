import React, { useEffect } from 'react';

export default function GoogleTranslate () {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
        {
            pageLanguage: "en",
            autoDisplay: false
        },
        "google-translate"
        );
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.id = 'google-translate-script';
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;  
    
        return () => {
            document.body.removeChild(script);
            delete window.googleTranslateElementInit;
        }
    }, []);

    return <div id="google-translate"></div>
}