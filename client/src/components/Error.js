import React from 'react'

function Error({meassge}) {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                Something went wrong , please try it later
                {meassge}
            </div>
        </div>
    )
}

export default Error
