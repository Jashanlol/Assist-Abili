const domain = window.location.origin;
const current_page = window.location.pathname;
let assignments = null;
let grades = null;
let options = {};
let timeCheck = null;

isDomainCanvasPage();

function startExtension() {
    toggleDarkMode();
    const optionsList = ["assignments_due", "dashboard_grades", "gradient_cards", "auto_dark", "auto_dark_start", "auto_dark_end", 'num_assignments', 'assignments_done', "gpa_calc", "assignment_date_format", "assignments_quizzes", "assignments_discussions", "dashboard_notes", "dashboard_notes_text", "improved_todo", "todo_hr24", "new_install", "condensed_cards"];
    chrome.storage.local.get(optionsList, result => {
        options = { ...options, ...result };
        toggleAutoDarkMode();
        getAssignmentData();
        checkDashboardReady();
        if (options.condensed_cards === true) {
            condenseCards();
        }
    });

    chrome.runtime.onMessage.addListener(function (request) {
        chrome.storage.local.get(["dark_mode", "auto_dark", "dark_css", "auto_dark_start", "auto_dark_end"], result => {
            options = { ...options, ...result };
            if (request.message === "darkmode") {
                toggleDarkMode();
            }
            if (request.message === "autodarkmode") {
                toggleAutoDarkMode();
            }
        })
    });

    console.log("Assist Abili - running");
}

let styleElementCreated = false;
function toggleDarkMode() {
    if (options.dark_mode && styleElementCreated === false) {
        let style = document.createElement('style');
        style.textContent = options.dark_css;
        document.documentElement.prepend(style);
        style.id = 'darkcss';
        styleElementCreated = true;
    } else if (styleElementCreated === true) {
        let css = document.getElementById("darkcss").childNodes[0];
        css.textContent = options.dark_mode ? options.dark_css : "";
    }
    iframeChecker(options.dark_mode);
}

function condenseCards() {
    let style = document.createElement('style');
    style.textContent = ".ic-DashboardCard__header_hero {height:60px!important}.ic-DashboardCard__header-subtitle, .ic-DashboardCard__header-term{display:none}";
    document.documentElement.prepend(style);
}

let iframeObserver;
function iframeChecker(enabled) {
    if (current_page === "/" || current_page === "") return;

    if (enabled === false) {
        if (iframeObserver) iframeObserver.disconnect();
        document.querySelectorAll('iframe').forEach((frame) => {
            if (frame.contentDocument && frame.contentDocument.documentElement && frame.contentDocument.documentElement.querySelector('#darkcss')) {
                frame.contentDocument.documentElement.querySelector('#darkcss').textContent = '';
            }
        });
        return;
    }

    const callback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].nodeName == "IFRAME") {
                const frame = mutation.addedNodes[0];
                const new_style_element = document.createElement("style");
                new_style_element.textContent = options.dark_css;
                new_style_element.id = "darkcss";
                frame.contentDocument.documentElement.prepend(new_style_element);
            }
        }
    };

    iframeObserver = new MutationObserver(callback);
    iframeObserver.observe(document.querySelector('html'), { childList: true, subtree: true });
}

function isDomainCanvasPage() {
    chrome.storage.local.get(['custom_domain', 'dark_css', 'dark_mode'], result => {
        options = result;
        if (result.custom_domain && result.custom_domain != [""] && result.custom_domain != '') {
            try {
                result.custom_domain.forEach(e => {
                    if (domain.includes(e)) {
                        startExtension();
                        return;
                    }
                })
            } catch (e) {
                try { // for users who set a url using an older version
                    if (domain.includes(result.custom_domain)) {
                        startExtension();
                        return;
                    }
                } catch (e) {
                    console.log(e);
                    console.log("custom url is having issues - contact ksucpea@gmail.com");
                }
            }
        } else {
            setupCustomURL();
        }
    });
}
