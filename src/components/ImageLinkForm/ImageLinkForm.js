import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ inputLink, onImageSubmit, isSignedIn }) => {
    return (
        <div className="">
            <p className="f4 b ">
                {'This Magic Brain Will Detect Faces in your Image, try now !'}
            </p>
            <div className="center"  >
                <div className=" ma2 shadow-3 pa4 form "   style={{ minWidth: 'min-content' }} >
                    <input type='text'
                        className="f4 pa2 center w-70 br2 ba b--none blue mv3 mh-1 w-90"
                       
                        onChange={inputLink}
                    />
                    <button
                        className="center f4 pa2 ml1  grow dib white bg-blue br2 ba b--none "
                        // style={{ minWidth: '10%' }}
                        onClick={onImageSubmit}
                    >{'Detect'}</button>
                </div>
            </div>
        </div>
    );
}


export default ImageLinkForm
