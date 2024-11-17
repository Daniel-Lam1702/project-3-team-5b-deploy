import React, { useEffect, useRef } from 'react';

export default function GoogleTranslate () {
    const isInitialized = useRef(false);

    const googleTranslateElementInit = () => {
        if(isInitialized.current) 
            return;
        new window.google.translate.TranslateElement(
        {
            pageLanguage: "en",
            autoDisplay: true
        },
        "google-translate"
        );
        isInitialized.current = true;
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