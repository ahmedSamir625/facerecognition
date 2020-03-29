import React from 'react'
import './FaceRecognition.css'

// const FaceRecognition = ({imgUrl , squareSides}) => {
//     return (
//         // console.log(imgUrl),
//          console.log(squareSides ),
          
//         <div >
//             <img id ="inputImage" src = {imgUrl} alt={''} width="500px" height="auto" className="ba br3 shadow-5 b--none"/>
//             <div className="bounding-box" style={{top: squareSides.topRow, right: squareSides.rightCol, bottom: squareSides.bottomRow, left: squareSides.leftCol}}></div>

//         </div>
//     )
// }

const FaceRecognition = ({ imageUrl, box }) => {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputImage' alt='' src={imageUrl} width='500px' heigh='auto'/>
          {/* <div className="bounding-box" style={{top: 100, right: 50, bottom: 10, left: 40}}></div> */}
          <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
      </div>
    );
  }

export default FaceRecognition
