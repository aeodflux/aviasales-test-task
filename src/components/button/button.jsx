import React from 'react';
import cn from 'classnames';

export const Button = ({ onClick, children, variant }) => {
    return (
        <button type='button' 
            className={cn("more-results-button", {'more-results-button--errored' : variant === "error"})} 
            onClick={onClick}
        >
            {children}
        </button>
    )
}
