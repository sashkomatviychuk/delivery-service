import React from 'react';

export default function ErrorBox(props) {
    if (!props.error) {
        return null;
    }

    return (
        <div className="form__error">
            <span>{props.error}</span>
            {/* <button type="button" class="form__error-close">&times;</button> */}
        </div>
    );
}