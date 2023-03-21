chrome.runtime.onInstalled.addListener(function () {
    let optionslist = ['new_install', 'assignments_due', 'gpa_calc', 'dark_mode', 'gradient_cards', 'link_preview', 'auto_dark', 'auto_dark_start', 'auto_dark_end', 'assignment_potentials', 'num_assignments', 'assignments_done', 'assignment_date_format', 'assignments_quizzes', 'assignments_discussions', 'dashboard_notes', 'dashboard_notes_text', 'improved_todo', 'todo_hr24', 'condensed_cards'];
    chrome.storage.local.get(optionslist, function (result) {
        let newOptions = {};
        optionslist.forEach(function (option) {
            console.log(result);
            if (result[option] === undefined) { // checking for empty keys
                switch (option) {
                    case 'new_install':
                        chrome.runtime.openOptionsPage();
                        newOptions.new_install = true;
                        newInstallCSS();
                        break;
                    case 'dark_mode': newOptions.dark_mode = true; break;
                    case 'dyslexia_mode': newOptions.dyslexia_mode = true; break;
                    case 'cb_mode1' : newOptions.cb_mode1 = true; break;
                    case 'cb_mode2' : newOptions.cb_mode2 = true; break;
                    
                }
            }
        });
        if (Object.keys(newOptions).length > 0) {
            console.log(newOptions);
            chrome.storage.local.set(newOptions);
        }
    });
    updateNewCSS();
});

function newInstallCSS() {
    fetch(chrome.runtime.getURL('js/darkcss.json'))
        .then((resp) => resp.json())
        .then(function (result) {
            chrome.storage.local.set({ dark_css: result.dark_css });
        });
    chrome.storage.local.set({ new_install: false });
}

function updateNewCSS() {
    fetch(chrome.runtime.getURL('js/darkcss.json'))
        .then((resp) => resp.json())
        .then(function (updated) {
            chrome.storage.local.get(['dark_css'], function (current) {
                if (!current.dark_css) return;
                const old = current.dark_css.split('--abstop:#000}')[0];
                const cur = updated.dark_css.split('--abstop:#000}')[1];
                const new_dark_css = old + "--abstop:#000}" + cur;
                chrome.storage.local.set({ dark_css: new_dark_css });
            });
        });
}