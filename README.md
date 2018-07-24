# Steam Key Extension

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1ca8cd84582e4bee82273eea184873e8)](https://app.codacy.com/app/cloudswift/SKE?utm_source=github.com&utm_medium=referral&utm_content=Cloud-Swift/SKE&utm_campaign=badger)

## Description

[Steam Key Extension](https://ske.pixv.io) is a web-based tool which can help you extract and format your Steam Keys to ASF `!redeem` style. Also it can export your Keys to [csv](https://en.wikipedia.org/wiki/Comma-separated_values) file with game titles.

## Core Features

- Extract your keys from a large number of text.
- Format keys into [ASF](https://github.com/JustArchi/ArchiSteamFarm) `!redeem` style.
- Export Keys to csv file with game titles.
- Full [PWA](https://developers.google.com/web/progressive-web-apps/) (Progressive Web Apps).
- Can use offline.
- No third-party web server, full static site hosted on [GitHub Page](https://pages.github.com/).
- Can use it on smart phone like native apps.

## How to use

- Just open [https://ske.pixv.io](https://ske.pixv.io) in your loved browser.
- Input your Bot Name.(optional)
- Copy your text to "Input" textarea
- Clicking "Extract" button will extract your keys to "Output" textarea into ASF `!redeem` format.
- Clicking "Copy" button will copy the text in "Output" textarea.
- Clicking "Clear" button will clear "Input" and "Output".
- Clicking "Export" button will export Keys with titles to a csv file. (Note: At present, only support Humble Bundle, Fanatical, Indiegala, Groupees, DailyIndieGame and some of Agiso)

### Extract Keys Demo

![Extract Keys Demo](resources/ExtractKeysDemo.gif)

### Export Keys with Titles Demo

![Export Keys with Titles Demo](resources/ExportKeysWithTitlesDemo.gif)

## Use it offline

These feature need broswer support.(Chrome version 64+,latest Firefox/Opera/Safari/Microsoft Edge)

1. Open Chrome Flags(chrome://flags/#enable-desktop-pwas), Enable "Desktop PWAs".(Note: Chrome will restart.)
2. Open [SKE](https://ske.pixv.io), then click "Customize and control Google Chrome" and select "Install to desktop..."
3. Well done! Now, you can use it offline.
4. You can open it via Chrome Apps(chrome://apps) or Windows Start Menu.

### Install to Desktop by Chrome Demo

![Install to Desktop](resources/InstalltoDesktopDemo.gif)

### Install to Android by Chrome Demo

![Install to Android](resources/AddtoHomeScreen.jpg)

Add it, then you can find it in launcher and use it like native apps.

## Unstall

Open Chrome Apps(chrome://apps) -> right-click the icon -> Remove from Chrome.

## Privacy Policy

This is a full static site, and there is no third-part server. Nobody can get your infomation and the text you type.

This site is open source based on the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0), and anyone can view the source code of this site here.

## Feedback

If you have any problems in use, feel free to leave a message in [issue page](https://github.com/Cloud-Swift/SKE/issues).