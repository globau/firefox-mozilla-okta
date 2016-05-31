function focus_code_field() {
    for (let input of document.querySelectorAll('[id^=duo-verify-code-]')) {
        if (input.offsetParent) {
            input.focus();
            break;
        }
    }
}

function on_code_keypressed(event) {
    if (event.keyCode === 13) {
        document.querySelector('#verify_factor').click();
    }
}

self.port.on('init', function(prefs) {
    if (!document.querySelector('#extra-verification-challenge')) {
        return;
    }
    if(document.querySelector('#factor_selector')) {

        // fix overly long devices
        for (let option of document.querySelectorAll('#factor_selector option')) {
            option.textContent = option.textContent.replace(/ \S+DuoPushPhone\S+ /, ' Phone ');
        }

        // focus the currently visible code field after factor selected
        document.querySelector('#factor_selector').addEventListener('change', focus_code_field);
        focus_code_field();

    } else {

        // focus the code field if there is no #factor_selector
        focus_code_field();
    }

    // pressing enter in the code field should submit
    for (let input of document.querySelectorAll('[id^=duo-verify-code-]')) {
        input.addEventListener('keypress', on_code_keypressed);
    }

    // check 'remember device' if required
    if (prefs.rememberDevice) {
        for (let input of document.querySelectorAll('[id^=duo-remember-checkbox]')) {
            input.checked = true;
        }
    }
});

