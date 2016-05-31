let pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: 'https://mozilla.okta.com/*',
    contentStyleFile: './content-styles.css',
    contentScriptFile: './content-script.js',
    contentScriptWhen: 'end',
    onError: function(e) {
        console.error(e.value);
    },
    onAttach: function(worker) {
        worker.port.emit('init', require('sdk/simple-prefs').prefs);
    }
});
