const languageSelect = document.querySelector("#language-select");
const pageTitle = document.querySelector("#page-title");
const pageDescription = document.querySelector("#page-description");
const loginButton = document.querySelector("#login-button");
const loadError = document.querySelector("#load-error");
const languageTags = {
    "en-PE": "es-PE",
    "en-US": "en-US",
    "fr-FR": "fr-FR",
};
let languageRequest = 0;

async function changeLanguage(locale) {
    const request = ++languageRequest;
    loadError.hidden = true;

    try {
        if (window.location.protocol === "file:") {
            throw new Error("Abre el proyecto con Live Server para cargar los archivos JSON.");
        }

        const response = await fetch(`locales/${locale}.json`);
        if (!response.ok) {
            throw new Error(`No se pudo cargar locales/${locale}.json (${response.status}).`);
        }

        const translations = await response.json();
        if (request !== languageRequest) return;
        if (!translations.title || !translations.description || !translations.button) {
            throw new Error(`El archivo locales/${locale}.json debe incluir title, description y button.`);
        }

        pageTitle.textContent = translations.title;
        pageDescription.textContent = translations.description;
        loginButton.textContent = translations.button;
        document.documentElement.lang = languageTags[locale];
        document.title = translations.title;
    } catch (error) {
        if (request !== languageRequest) return;
        loadError.textContent = error.message;
        loadError.hidden = false;
    }
}

languageSelect.addEventListener("change", () => changeLanguage(languageSelect.value));
changeLanguage(languageSelect.value);