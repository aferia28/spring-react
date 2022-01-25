import React from 'react'

export function Button({ type, text }) {

    const buttonType = `btn btn-${type}`;
    return (
        <button className={buttonType}>
            {text}
        </button>
    )
}
