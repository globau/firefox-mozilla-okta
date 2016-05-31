let pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: 'https://mozilla.okta.com/*',
    contentScriptFile: './content-script.js',
    contentScriptWhen: 'end',
    onError: function(e) {
        console.error(e.value);
    }
});
