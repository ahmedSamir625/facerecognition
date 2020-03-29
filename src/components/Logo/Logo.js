import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png'


function logo() {
    return (
        <div className='ma4 mt0'   >
            <Tilt className="Tilt shadow-2 br2" options={{ max: 40 }} style={{ height: 150, width: 150 }}  >
                <div className="Tilt-inner " >
                    <img  alt='logo' src = {brain} align="middle" style={{padding:'25px'}} />
                </div>
            </Tilt>
        </div>
    )
}

export default logo



