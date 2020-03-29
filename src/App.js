import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai'
import { particlesParameters } from './Constants'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'


const initialState = {
  input: '',
  imgUrl: '',
  squareSides: {},
  route: 'signIn',
  isSignedIn: false,

  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joinDate: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    // console.log('the initial state : ',initialState);
    // console.log('the  state : ',this.state);

  }


  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joinDate: user.joinDate,
      }
    })
  }

  componentDidMount() {
    fetch('https://shielded-castle-16961.herokuapp.com')
      .then(response => response.json())
      // .then(data=>console.log(data));
      .then('the initial response is  >>>> ', console.log)
      .catch(console.log);
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'home')
      this.setState({ isSignedIn: true })
    // else if (route === 'signOut')
    else
      this.setState(initialState);
    this.setState({ route: route })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  detectFaces = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(dimensions);
    const img = document.getElementById("inputImage");
    const width = img.width;
    const height = img.height;

    // console.log("the width  : ",width , " , the height  : ",height);    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  drawFaceSquare = (squareSides) => {
    this.setState({ squareSides: squareSides })

  }

  onImageSubmit = () => {

    this.setState({ imgUrl: this.state.input });
    // fetch('http://localhost:3000/imageUrl', {
    fetch('https://shielded-castle-16961.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
      //34an dy FETCH f lazm a7lwha l json l awl
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://shielded-castle-16961.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.drawFaceSquare(this.detectFaces(response));
        console.log(this.detectFaces(response));

      })
      .catch(error => console.log(error))
  }



  render() {
    const { imgUrl, squareSides, route, isSignedIn } = this.state;
    console.log('isSignedIn from App.js ------ >>> ', isSignedIn);


    return (

      <div className="App" >
        <Particles
          className="particles"
          params={particlesParameters} />

        <div className="logo-nav-position mv2">
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>

        {

          this.state.route === 'home'
            ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm isSignedIn={isSignedIn} inputLink={this.onInputChange} onImageSubmit={this.onImageSubmit} />
              <FaceRecognition imageUrl={imgUrl} box={squareSides} />
            </div>
            : (
              route === 'signIn'
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }

}

export default App;
