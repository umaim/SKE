const txtBotName = document.getElementById("bot-name");
const txtInput = document.getElementById("ske-input");
const btnExtract = document.getElementById("ske-extract");
const btnCopy = document.getElementById("ske-copy");
const btnExport = document.getElementById("ske-export");
const btnClear = document.getElementById("ske-clear");
const txtOutput = document.getElementById("ske-output");
const keyRegex = /(?:(?:([A-Z0-9])(?!\1{4})){5}-){2,5}[A-Z0-9]{5}/g;
const unique = a => [...new Set(a)];

btnExtract.onclick = () => {
    txtOutput.value = "";

    const keys = unique(txtInput.value.match(keyRegex));
    if (keys.length > 0) {
        txtOutput.value = "!redeem " + (txtBotName.value==""?"":(txtBotName.value+" ")) + keys.join(",");
        txtOutput.focus();
    } else {
        M.toast({
            html: 'Keys not Found!'
        });
    }
    M.updateTextFields();
    M.textareaAutoResize(txtOutput);
    M.textareaAutoResize(txtInput);
}

btnCopy.onclick = () => {
    txtOutput.select();
    document.execCommand("Copy");
    M.toast({
        html: 'Copied!'
    });
}

btnClear.onclick = () => {
    txtInput.value = "";
    txtOutput.value = "";
    M.updateTextFields();
    M.textareaAutoResize(txtOutput);
    M.textareaAutoResize(txtInput);

    M.toast({
        html: 'Cleared!'
    });
}