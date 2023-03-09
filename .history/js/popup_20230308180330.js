let switches = ['dark_mode', 'dyslexia_mode'];

/*chrome.storage.local.get("dark_mode", function (result){
    let status = result["dark_mode"] === true ? "#on" : "#off";
    document.querySelector('#dark_mode > ' + status).setAttribute('checked', true);
    document.querySelector('#dark_mode > ' + status).classList.add('checked');
    
})
document.querySelector('#dark_mode > .slider').addEventListener('mouseup', function () {
    document.querySelectorAll('#dark_mode > input').forEach(function (box) {
        box.toggleAttribute('checked');
        box.classList.toggle('checked');
    });
    let status = document.querySelector('#dark_mode > #on').checked;
    switch ("dark_mode") {
        case 'dark_mode': chrome.storage.local.set({ dark_mode: status }); sendFromPopup("darkmode"); break;
    }
});*/
switches.forEach(function (option) {
chrome.storage.local.get(option, function (result){
    let status = result[option] === true ? "#on" : "#off";
    document.querySelector('#' + option + ' > ' + status).setAttribute('checked', true);
    document.querySelector('#' + option + ' > ' + status).classList.add('checked');
    
})
document.querySelector('#' + option + ' > .slider').addEventListener('mouseup', function () {
    document.querySelectorAll('#' + option + ' > input').forEach(function (box) {
        box.toggleAttribute('checked');
        box.classList.toggle('checked');
    });
    let status = document.querySelector('#' + option + ' > #on').checked;
    switch (option) {
        case 'dark_mode': chrome.storage.local.set({ dark_mode: status }); sendFromPopup("darkmode"); break;
        case 'dyslexia_mode': chrome.storage.local.set({ dyslexia_mode: status }); sendFromPopup("dyslexiamode"); break;
    }
});
});
// customization tab

document.querySelector("#setToDefaults").addEventListener("click", setToDefaults);

document.querySelectorAll(".preset-button.customization-button").forEach(btn => btn.addEventListener("click", changeToPresetCSS));

chrome.storage.local.get(['dark_css'], result => getColors(result.dark_css));


function getColors(data) {
    const colors = data.split(":root")[1].split("--abstop")[0];
    const backgroundcolors = document.querySelector("#option-background");
    const textcolors = document.querySelector("#option-text");
    colors.split(";").forEach(function (color) {
        const type = color.split(":")[0].replace("{", "").replace("}", "");
        const currentColor = color.split(":")[1];
        let option;
        if (type) {
            if (document.querySelector("." + type)) changePreview(type, currentColor);
            if (type.includes("background")) {
                option = makeElement("div", "changer", backgroundcolors);
            } else if (type.includes("text")) {
                option = makeElement("div", "changer", textcolors);
            }
            option.style.background = currentColor;
            option.dataset.name = type;
            let colorChange = makeElement("input", "color-changer", option);
            colorChange.value = currentColor.replace("#", "");
            colorChange.addEventListener("change", function (e) {
                changeAdjacentCSSColor(option.dataset.name, e.target.value);
                option.style.background = "#" + e.target.value;
                if (document.querySelector("." + type)) changePreview(type, "#" + e.target.value);
            });
        }
    })
}

function changeAdjacentCSSColor(name, color) {
    chrome.storage.local.get(['dark_css'], function (result) {
        const leftText = result.dark_css.split(name + ":#")[0];
        const [changing, ...rest] = result.dark_css.split(name + ":#")[1].split(";");
        const done = leftText.concat(name, ":#", color, ";", rest.join(";"));
        changeColors(done);
    });
}

function changeToPresetCSS(e) {
    chrome.storage.local.get(['dark_css'], function (result) {
        const right = result.dark_css.split("--abstop:#000}")[1];
        let css;
        switch (e.target.id) {
            case ('red-green'):
                css = ":root{--abbackgrounddark0:#272727;--abbackgrounddark1:#353535;--abbackgrounddark2:#404040;--abbackgrounddark3:#454545;--abtextlight0:#f5f5f5;--abtextlight1:#e2e2e2;--abtextlight2:#ababab;--abtextlink:#5ca5f6;--abstop:#000}";
                break;
            case ('blue-yellow'):
                css = ":root{--abbackgrounddark0:#14181d;--abbackgrounddark1:#1a2026;--abbackgrounddark2:#212930;--abbackgrounddark3:#2e3943;--abtextlight0:#f5f5f5;--abtextlight1:#e2e2e2;--abtextlight2:#ababab;--abtextlink:#5ca5f6;--abstop:#000}";
                break;
        }
        let new_css = css + right;
        changeColors(new_css);
    });
}

function setToDefaults() {
    fetch(chrome.runtime.getURL('js/darkcss.json'))
        .then((resp) => resp.json())
        .then(function (result) {
            changeColors(result.dark_css);
        });
}

function changeColors(dark_css) {
    chrome.storage.local.set({ dark_css: dark_css });
    ['.option-background', '.option-color'].forEach(function (selector) {
        document.querySelector(selector).textContent = "";
    });
    getColors(dark_css);
    sendFromPopup("darkmode");
}

function makeElement(element, elclass, location, text) {
    let creation = document.createElement(element);
    creation.classList.add(elclass);
    creation.textContent = text;
    location.appendChild(creation);
    return creation
}

function sendFromPopup(message) {
    try {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": message });
        });
    } catch (e) {
    }
}

module.exports = {
    makeElement
};