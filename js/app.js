/*
 * Copyright 2018 Cloud
 * Contact: hi@cloudswift.me or cloudswift@qq.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
    "use strict";



    const config = {
        saveBotName: name => {
            localStorage.skeBotName = name;
        },
        getBotName: () => {
            return localStorage.skeBotName || "";
        },
        saveLanguage: language => {
            localStorage.skeLanguage = language;
        },
        getLanguage: () => {
            return localStorage.skeLanguage || "english";
        },
        refreshUI: text => {
            lblBotName.innerText = text.botName;
            lblInput.innerText = text.input;
            btnExtract.innerHTML = `<i class="material-icons left hide-on-med-and-down">colorize</i>${text.extract}`;
            btnCopy.innerHTML = `<i class="material-icons left hide-on-med-and-down">content_copy</i>${text.copy}`;
            btnExport.innerHTML = `<i class="material-icons left hide-on-med-and-down">archive</i>${text.export}`;
            btnClear.innerHTML = `<i class="material-icons left hide-on-med-and-down">clear_all</i>${text.clear}`;
            lblOutput.innerText = text.output;
        }
    };

    const i18n = {
        schinese: {
            botName: "Bot 名称",
            input: "输入",
            output: "输出",
            extract: "提取",
            copy: "复制",
            export: "导出",
            clear: "清空",
            findXKeys: "找到%X%个Key",
            keysNotFound: "未找到Key",
            copied: "已复制",
            cleared: "已清空"
        },
        tchinese: {
            botName: "Bot 名稱",
            input: "輸入",
            output: "輸出",
            extract: "提取",
            copy: "複製",
            export: "導出",
            clear: "清空",
            findXKeys: "找到%X%個Key",
            keysNotFound: "未找到Key",
            copied: "已復制",
            cleared: "已清空"
        },
        english: {
            botName: "Bot Name",
            input: "Input",
            output: "Output",
            extract: "Extract",
            copy: "Copy",
            export: "Export",
            clear: "Clear",
            findXKeys: "Found %X% Keys",
            keysNotFound: "Keys not Found",
            copied: "Copied",
            cleared: "Cleared"
        }
        /* for more languages
        ,{
            botName: "",
            input: "",
            output: "",
            extract: "",
            copy: "",
            export: "",
            clear: "",
            findXKeys: "",
            keysNotFound: "",
            copied: "",
            cleared: ""
        }*/
    };
    let text = i18n[config.getLanguage()];

    const txtBotName = document.getElementById("ske-bot-name");
    const txtInput = document.getElementById("ske-input");
    const btnExtract = document.getElementById("ske-extract");
    const btnCopy = document.getElementById("ske-copy");
    const btnExport = document.getElementById("ske-export");
    const btnClear = document.getElementById("ske-clear");
    const txtOutput = document.getElementById("ske-output");
    const lblBotName = document.getElementById("ske-lbl-bot-name");
    const lblInput = document.getElementById("ske-lbl-input");
    const lblOutput = document.getElementById("ske-lbl-output");
    const btnEnglish = document.getElementById("ske-language-english");
    const btnSChinese = document.getElementById("ske-language-schinese");
    const btnTChinese = document.getElementById("ske-language-tchinese");
    const keyRegex = /(?:(?:([A-Z0-9])(?!\1{4})){5}-){2,5}[A-Z0-9]{5}/g;
    const unique = a => [...new Set(a)];

    var dropdown = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(dropdown, {
        alignment: "right"
    });

    config.refreshUI(text);
    txtBotName.value = config.getBotName();

    // Extract Keys from input textarea
    btnExtract.onclick = () => {
        txtOutput.value = "";

        const keys = unique(txtInput.value.match(keyRegex));
        if (keys.length > 0) {
            M.toast({
                html: text.findXKeys.replace("%X%", keys.length)
            });

            txtOutput.value = `!redeem ${(txtBotName.value && txtBotName.value + " ")}${keys.join(",")}`;
            txtOutput.focus();
        } else {
            M.toast({
                html: text.keysNotFound
            });
        }

        config.saveBotName(txtBotName.value);

        M.updateTextFields();
        M.textareaAutoResize(txtOutput);
        M.textareaAutoResize(txtInput);
    };

    // Copy text in output textarea
    btnCopy.onclick = () => {
        txtOutput.select();
        document.execCommand("Copy");
        M.toast({
            html: text.copied
        });
    };

    function exportKeysWithTitle(data) {
        // data format: {Key:Title,Key:Title,....}
        btnExport.removeAttribute("href");
        btnExport.removeAttribute("download");
        if (Object.keys(data).length > 0) {
            const fileName = `Export Keys ${new Date().Format("yyyy-MM-dd hh:mm:ss")}`;
            let formattedData = "";
            for (let key in data) {
                formattedData = `${data[key]},${key}\r\n${formattedData}`;
            }
            formattedData = `Game,Key\r\n${formattedData}`;

            btnExport.setAttribute("href", `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(formattedData)}`);
            btnExport.setAttribute("download", `${fileName}.csv`);
        }
    }

    // Export keys in input textarea with titles
    btnExport.onclick = () => {
        /* Format: {Key1: Title1, Key2: Title2,...} */
        let keysWithTitles = {};

        // Remove blank lines.
        let lines = txtInput.value.trim().split("\n");
        lines = lines.filter(v => v.trim());
        if (lines.length > 0) {
            let key = "";
            let title = "";
            let isFoundKey = false;
            let line = lines.pop();
            while (line) {
                if (line.match(keyRegex)) {
                    key = line.match(keyRegex).pop();
                    keysWithTitles[key] = "";
                    isFoundKey = true;

                    // Find title in line.
                    if (key.length == line.length) {
                        // Key only, no other characters. Try to find title in other lines.
                    } else {
                        if (line.indexOf("ASF格式：") > -1 || line.indexOf("!redeem") > -1) {
                            // next line
                            line = lines.pop();
                        }
                        if (line.indexOf("\tSTEAM\t") > -1) {
                            // DIG support.
                            let words = line.split("\t");
                            if (words.length > 2) {
                                title = words[words.indexOf(key) - 2];
                                keysWithTitles[key] = title;
                                isFoundKey = false;
                            }
                        } else if (line.indexOf("【Key】") > -1) {
                            // Agiso XinChen
                            let words = line.split("【Key】");
                            if (words.length > 1) {
                                title = words[0];
                                keysWithTitles[key] = title;
                                isFoundKey = false;
                            }
                        } else if (line.indexOf("卡号：") > -1) {
                            // Agiso DaShu
                            let words = line.split("\t");
                            if (words.length > 1) {
                                title = words[0].substr(3);
                                keysWithTitles[key] = title;
                                isFoundKey = false;
                            }
                        }
                    }
                } else if (isFoundKey) {
                    // find key in previous lines.
                    if (line.match("Steam key:    Used")) {
                        // Groupees
                        line = lines.pop();
                        continue;
                    } else {
                        title = line;
                        keysWithTitles[key] = title;
                        isFoundKey = false; // find next key.
                    }
                }

                // next line
                line = lines.pop();
            } // end while.
        } else {
            M.toast({
                html: text.keysNotFound
            });
        }
        config.saveBotName(txtBotName.value);
        exportKeysWithTitle(keysWithTitles);
    };

    // Clear input & output textarea
    btnClear.onclick = () => {
        txtInput.value = "";
        txtOutput.value = "";
        M.updateTextFields();
        M.textareaAutoResize(txtOutput);
        M.textareaAutoResize(txtInput);

        M.toast({
            html: text.cleared
        });
    };

    btnEnglish.onclick = () => {
        config.saveLanguage("english");
        text = i18n["english"];
        config.refreshUI(text);
    };

    btnSChinese.onclick = () => {
        config.saveLanguage("schinese");
        text = i18n["schinese"];
        config.refreshUI(text);
    };

    btnTChinese.onclick = () => {
        config.saveLanguage("tchinese");
        text = i18n["tchinese"];
        config.refreshUI(text);
    };

    // Register Service Worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js").then(function ( /*registration*/ ) {
            // Registration was successful
            // console.log("ServiceWorker registration successful with scope: ", registration.scope);
        }, function ( /*err*/ ) {
            // registration failed :(
            // console.log("ServiceWorker registration failed: ", err);
        });
    }

    // Date Format
    Date.prototype.Format = function (format) {
        var o = {
            "y+": this.getFullYear(),
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                if (k == "y+") {
                    format = format.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
                } else if (k == "S+") {
                    var lens = RegExp.$1.length;
                    lens = lens == 1 ? 3 : lens;
                    format = format.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
                } else {
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
        }
        return format;
    };
})();