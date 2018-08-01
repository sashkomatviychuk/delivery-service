export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

/**
 * Get show alert action params
 * @param {String} message
 * @param {String} style
 */
function showAlert(message, style) {
    return {
        message,
        style,
        type: SHOW_ALERT,
    };
}

// show alert with type 'info'
export const showInfo = message => showAlert(message, 'info');
// show alert with type 'error'
export const showError = message => showAlert(message, 'error');
// hide alert panel
export const hideAlert = () => {
    return {
        type: HIDE_ALERT,
    };
}