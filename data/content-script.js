function focus_code_field() {
    for (let input of document.querySelectorAll('[id^=duo-verify-code-]')) {
        if (input.offsetParent) {
            input.focus();
            input.select();
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

    if (document.querySelector('#factor_selector')) {
        // fix overly long devices
        for (let option of document.querySelectorAll('#factor_selector option')) {
            option.textContent = option.textContent.replace(/ \S+DuoPushPhone\S+ /, ' Phone ');
        }

        // focus the currently visible code field after factor selected
        document.querySelector('#factor_selector').addEventListener('change', focus_code_field);
    }

    // focus the currently visible code field
    focus_code_field();

    // pressing enter in the code field should submit
    for (let input of document.querySelectorAll('[id^=duo-verify-code-]')) {
        input.addEventListener('keypress', on_code_keypressed);
    }

    // put focus back on code field on submit in case of code error
    document.querySelector('#verify_factor').addEventListener('click', focus_code_field);


    // check 'remember device' if required
    if (prefs.rememberDevice) {
        for (let input of document.querySelectorAll('[id^=duo-remember-checkbox]')) {
            input.checked = true;
        }
    }
});

