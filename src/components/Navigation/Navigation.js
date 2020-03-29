import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {

    return (
        console.log('isSignedIn : ',isSignedIn),
        
        isSignedIn
            ? <nav onClick={() => onRouteChange('signIn')} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f4 link dim black underline pa3 pointer '>Sign Out</p>
            </nav>
            : <div></div>
    )
}

export default Navigation
