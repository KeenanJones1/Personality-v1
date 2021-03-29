import React, { Component } from 'react'
import anime from 'animejs'
import Intro from './components/Intro'
import Question from './components/Question'

class App extends Component {
  constructor(){
    super()
    this.state={
      showQuestion: false
    }
  }

  animeOut(){
    setTimeout(
      () => anime({
        targets: '.card',
        translateX: '150%',
        elasticity: function(el, i, l){
          return 200 + i * 200
        }
      }),
      200
    )
  }


  handleStart = () => {
    this.animeOut()
    setTimeout(() => this.setState({showQuestion: true}), 1000);
  }


  renderIntro = () => {
    // This will be the intro component 
    return <Intro handleStart={this.handleStart} title= "Welcome to Personality Test"/>
  }

  renderQuestion = () => {
    return <Question />
  }

  render() {
    return (
      <div>
        {this.state.showQuestion ? this.renderQuestion() : this.renderIntro() }
      </div>
    )
  }
}

export default App
