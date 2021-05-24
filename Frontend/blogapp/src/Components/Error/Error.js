import React from 'react'
import "./Error.style.css"

function Error({children, error}) {
    return <span className={`${error? "errorShow":"errorHide"}`}>{`${error? children: "Welcome to Techgenics"}`}</span>;
}

export default Error
