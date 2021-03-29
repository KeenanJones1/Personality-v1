import React, { Component } from 'react'
import Briggs from './Briggs'
import Colors from './Colors'
import Letters from './Letters'

class Results extends Component {
 constructor(){
  super()
  this.state = {
   showColorsResult: true,
   showLettersResult: false,
   showBriggsResult: false
  }
 }

 renderResultColors = () => {
  return <Colors resultColors={this.props.resultColors} onNextClick={() => this.onNextClick()}/>
 }

 renderResultLetters = () => {
  return <Letters resultLetters={this.props.resultLetters} onNextClick={() => this.onNextClick()}/>
 }

 renderBriggsResult = () => {
  return <Briggs resultBriggs={this.props.resultBriggs}/>
 }

 onNextClick = () => {
  const {showColorsResult, showLettersResult, showBriggsResult} = this.state

  if(showColorsResult){
   setTimeout(() => {
    this.setState({
     showColorsResult: !showColorsResult,
     showLettersResult: !showLettersResult
    })
   }, 800)
  }else if(showLettersResult){
   setTimeout(() => {
    this.setState({
     showLettersResult: !showLettersResult,
     showBriggsResult: !showBriggsResult
    })
   }, 800)
  }
 }

 render() {
  const { showColorsResult, showLettersResult, showBriggsResult } = this.state

  if(showColorsResult){
   return this.renderResultColors()
  }else if(showLettersResult){
   return this.renderResultLetters()
  }else if(showBriggsResult){
   return this.renderBriggsResult()
  }
 }
}

export default Results
