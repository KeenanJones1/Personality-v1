import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from './utils/_var'
import Quiz from './Quiz/Quiz'
import Results from './Results/Results'
import quizQuestions from '../api/quizQuestions'
import { QuestionCard } from './utils/Cards'

const Wrapper = styled.div`
 position: fixed;
 min-height: 100%;
 max-width: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 background: ${colors.$colorBg};
`
class Question extends Component {
 constructor(){
 super()
 this.state = {
  questionReady: false,
  counter: 0, 
  questionId: 1,
  question: '',
  answerOptions: [],
  answer: '',
  answersCount: {
   // Change these to reflect pokemon team type
   Colors: {
    // Maybe count towards what types of pokemon should be on your team. 
    // Do more research into this.
    Green: 10, 
    Brown: 10,
    Blue: 10,
    Red: 10
   }, 
   Letters: {
    A: 10,
    B: 10,
    C: 10,
    D: 10
   },
   Briggs: {
    E: 5,
    I: 5,
    S: 5,
    N: 5,
    T: 5,
    F: 5,
    J: 5,
    P: 5,
   }
  },
  // Above keeps track of the answers and questions. 
  resultBriggs: '',
  resultColors: '',
  resultLetters: '',
 }
 }

 // to set the answer and then next question
 handleAnswerSelected = (e) => {
  this.setUserAnswer(e.currentTarget.value)
  // Either go to the next question or present the results based on the question id and the length of the questions.
  if(this.state.questionId < quizQuestions.length){
   setTimeout(() => this.setNextQuestion(), 800)
  }else{
   setTimeout(() => this.setResults(this.getColorsResults(), this.getLettersResults(), this.getBriggsResults()), 800)
  }
 }



 // ComponentWillMount to populate state
 componentWillMount() {
  const answerOptions = quizQuestions.map(question => question.answers)
  this.setState({
    question: quizQuestions[0].question,
    answerOptions: answerOptions[0]
  })
}

  // setting the answer based on the user’s selection
 setUserAnswer = (answer) => {
   const { answersCount } = this.state
   let applyAnswer = answer => {
    const answer_array = answer.split(',')
    let briggsAnswer = answer_array[0]
    let colorsAnswer = answer_array[1]
    let lettersAnswer = answer_array[2]
     if(answer_array.length === 3){
      answersCount['Briggs'][briggsAnswer] += 1
      answersCount['Colors'][colorsAnswer] += 1
      answersCount['Letters'][lettersAnswer] += 1
     }else if ( answer_array.length === 4){
      answersCount['Briggs'][briggsAnswer] -= 1
      answersCount['Colors'][colorsAnswer] -= 1
      answersCount['Letters'][lettersAnswer] -= 1
     }
     return answersCount
    }
    this.setState({
     answersCount: applyAnswer(answer),
     answer: answer
    })
   }
   // 
   setNextQuestion = () => {
    const counter = this.state.counter + 1
    const questionId = this.state.questionId + 1
    this.setState({
     counter: counter,
     questionId: questionId,
     question: quizQuestions[counter].question,
     answerOptions: quizQuestions[counter].answers,
     answer: '',
     questionReady: true
    })
   }




   handleAnswerSelected = (e) => {
    this.setUserAnswer(e.currentTarget.value)
    if(this.state.questionId < quizQuestions.length){
     setTimeout(() => this.setNextQuestion(), 800)
    }else{
     setTimeout(() => this.setResults(this.getColorsResults(), this.getLettersResults(), this.getBriggsResults()), 800)
    }
   }

// ==========================================
// Get results beginning
// ==========================================

getBriggsResults = () => {
  const {answersCount} = this.state
  const briggsAnswer = answersCount['Briggs']
  const answersCountKeysBriggs = Object.keys(briggsAnswer)

  const answersCountValuesBriggs = answersCountKeysBriggs.map(key => briggsAnswer[key])

  let briggsType = ''

  if(briggsAnswer.E >= briggsAnswer.I){
    briggsType += 'E'
  }else{
    briggsType += 'I'
  }
  if(briggsAnswer.S >= briggsAnswer.N){
    briggsType += 'S'
  }else{
    briggsType += 'N'
  }

  if(briggsAnswer.T >= briggsAnswer.F){
    briggsType += 'T'
  }else{
    briggsType += 'F'
  }

  if(briggsAnswer.J >= briggsAnswer.P){
    briggsType += 'J'
  }else{
    briggsType += 'P'
  }
  return briggsType
}

getColorsResults = () => {
  const answersCount = this.state.answersCount
  const colorsAnswer = answersCount['Colors']
  const answersCountKeysColors = Object.keys(colorsAnswer)
  const answersCountValuesColors = answersCountKeysColors.map(key => colorsAnswer[key])
  const maxAnswerCountColors = Math.max.apply(null, answersCountValuesColors)

  return answersCountKeysColors.filter(key => colorsAnswer[key] === maxAnswerCountColors)
}

getLettersResults = () => {
  const lettersAnswer = this.state.answersCount['Letters']
  const answersCountKeysLetters = Object.keys(lettersAnswer)
  const answersCountValuesLetters = answersCountKeysLetters.map(key => lettersAnswer[key])

  const maxAnswerCountLetters = Math.max.apply(null, answersCountValuesLetters)

  return answersCountKeysLetters.filter(key => lettersAnswer[key] === maxAnswerCountLetters)
}

setResults = (resultColors, resultLetters, resultBriggs) => {
  if(resultColors.length >= 1){
    this.setState({resultColors: resultColors[0]})
  }
  if(resultLetters.length >=1){
    this.setState({resultLetters: resultLetters[0]})
  }
  if(resultBriggs.length >= 1){
    this.setState({
      resultBriggs: resultBriggs
    })
  }
}

renderResults = () => {
  return <Results resultColors={this.state.resultColors} resultLetters={this.state.resultLetters} resultBriggs={this.state.resultBriggs}/>
}
// ==========================================
// Get results end
// ==========================================

  renderQuiz = () => {
    return (<Quiz
      answer={this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId={
        this.state.questionId
      }
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
    />)
  }

  render() {
  const { resultBriggs } = this.state
  if(resultBriggs){
   return this.renderResults()
  }
  else{
    return (
     // container class has the background color as a property.
     <Wrapper className="container">
       <QuestionCard>
        <div className="corner"/>
        <div className="corner"/>
        <div className="corner"/>
        <div className="corner"/>
       {this.renderQuiz()}
       </QuestionCard>
     </Wrapper>
    )
  }
 }
}

export default Question

