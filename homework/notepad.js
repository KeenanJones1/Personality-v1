setUserAnswer(answer) {
 const answersCount = this.state.answersCount
 let applyAnswer = answer => {
   const answer_array = answer.split(',')
   let briggsAnswer = answer_array[0]
   let colorsAnswer = answer_array[1]
   let lettersAnswer = answer_array[2]
   if (answer_array.length === 3) {
     answersCount['Briggs'][briggsAnswer] += 1
     answersCount['Colors'][colorsAnswer] += 1
     answersCount['Letters'][lettersAnswer] += 1
   } else if (answer_array.length === 4) {
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

// setNextQuestion() {
//  const counter = this.state.counter + 1
//  const questionId = this.state.questionId + 1
//  this.setState({
//    counter: counter,
//    questionId: questionId,
//    question: quizQuestions[counter].question,
//    answerOptions: quizQuestions[counter].answers,
//    answer: ''
//  })
// }


  // setting the answer and then setting the next question
  handleAnswerSelected(event) {
   this.setUserAnswer(event.currentTarget.value)
   if (this.state.questionId < quizQuestions.length) {
     setTimeout(() => this.setNextQuestion(), 800)
   } else {
     setTimeout(() => this.setResults(this.getColorsResults(), this.getLettersResults(), this.getBriggsResults()), 800)
   }
 }





//  if (resultBriggs) {
//   return this.renderResult()
// }
// return (
//   <Wrapper className="container">
//     <QuestionCard>
//       <div className="corner" />
//       <div className="corner" />
//       <div className="corner" />
//       <div className="corner" />
//       {this.renderQuiz()}
//     </QuestionCard>
//   </Wrapper>
// )


const Wrapper = styled.div`
  position: fixed;
  min-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colors.$colorBg};


  export const QuestionCard = styled.div.attrs({
  className: 'card'
})`
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  background: ${colors.$colorCardBg};
  background: repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.3), transparent 1px, rgba(0, 0, 0, 0.3) 2px);
  background-size: 3px 3px;
  color: #fff;
  ${media.tablet`width: 90%;`};
  ${media.laptop`width: 60%;`};
  .corner {
    backface-visibility: hidden;
    border-right: 2px solid #d4cd96;
    border-top: 2px solid #d4cd96;
    height: 12px;
    position: absolute;
    width: 12px;
    &:nth-of-type(1) {
      right: 5%;
      top: 5%;
    }
    &:nth-of-type(2) {
      left: 5%;
      top: 5%;
      transform: rotateZ(-90deg);
    }
    &:nth-of-type(3) {
      bottom: 5%;
      left: 5%;
      transform: rotateZ(180deg);
    }
    &:nth-of-type(4) {
      bottom: 5%;
      right: 5%;
      transform: rotateZ(90deg);
    }
  }
`


export const CardDef = styled.div.attrs({
  className: 'card'
})`
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  background: ${colors.$colorCardBg};
  background: repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.3), transparent 1px, rgba(0, 0, 0, 0.3) 2px);
  background-size: 3px 3px;
  color: #fff;
  ${media.tablet`width: 90%;`};
  ${media.laptop`width: 60%;`};
  h1 {
    position: relative;
    font-family: ${fonts.$titleFont};
    font-size: 1.1em;
    color: ${colors.$colorGold};
    text-align: center;
    margin-top: 2em;
    ${media.tablet`font-size: 1.5em; letter-spacing: 1.5px; margin-top: 3em;`};
    ${media.laptop`font-size: 2em; letter-spacing: 2px; margin-top: 1.5em;`};
  }
  .close {
    position: absolute;
    left: 3%;
    top: 2%;
    color: #fff;
    text-shadow: none;
    ${media.tablet`font-size: 1.8em;`};
    ${media.laptop`font-size: 2em; top: 5%;`};
  }
  p {
    padding: 1em 2.5em;
    font-size: 1em;
    font-family: ${fonts.$latoFont};
    ${media.tablet`font-size: 1.5em; padding: 1.5em 2em;`};
    ${media.laptop`font-size: 2em; padding: 1em 2.5em;`};
  }
`


const Wrapper = styled.div`
  margin: 1em 1em;
  z-index: 1;
  .row {
    margin: 0;
    ul {
      padding: 1em 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      flex-grow: 1;
      ${media.largerPhone`margin: 0 .8em;`};
      ${media.tablet`flex-direction: row; padding-right: 1.5em;`};
      ${media.laptop`margin-top: 1rem;`};
    }
  }
`


const Quiz = props => {
  const renderAnswerOptions = key => {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    )
  }
  return (
    <Wrapper key={props.questionId}>
      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <div className="w-100" />
      <Question content={props.question} />
      <div className="w-100" />
      <div className="row">
        <ul>{props.answerOptions.map(renderAnswerOptions)}</ul>
      </div>
    </Wrapper>
  )
}


/* <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      /> */


      const Wrapper = styled.div`
  li {
    list-style-type: none;
    input {
      position: absolute;
      opacity: 0;
      z-index: -1;
      & + label::before {
        border-radius: 18px;
      }
      &:checked + label {
        padding-left: 2rem;
        color: #fff;
      }
      &:checked + label::before {
        top: 0;
        width: 100%;
        height: 100%;
        background: ${colors.$colorGold};
      }
    }
    label {
      position: relative;
      padding-left: 3rem;
      line-height: 2.3rem;
      cursor: pointer;
      font-family: ${fonts.$mainFont};
      color: ${colors.$colorGold};
      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 1rem;
        display: block;
        width: 25px;
        height: 25px;
        border: 2px solid ${colors.$colorGold};
        border-radius: 4px;
        z-index: -1;
      }
      &,
      &::before {
        transition: 0.5s all ease;
      }
    }
  }
`


<li>
        <input
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          name={props.answerType}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
          type="radio"
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>


      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <div className="w-100" />
      <Question content={props.question} />
      <div className="w-100" />
      <div className="row">
        <ul>{props.answerOptions.map(renderAnswerOptions)}</ul>
      </div>



      import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from '../utils/_var'

const Wrapper = styled.div`
  .row {
    margin: 1rem 0;
    .col {
      padding: 1rem;
      h1 {
        font-size: 1.3rem;
        font-family: ${fonts.$mainFont};
        text-align: center;
      }
    }
  }
`

const Question = props => {
  return (
    <Wrapper>
      <div className="row">
        <div className="col">
          <h1>{props.content}</h1>
        </div>
      </div>
    </Wrapper>
  )
}


import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts, colors } from '../utils/_var'
import { media } from '../utils/_media-queries'

const Wrapper = styled.div`
  margin: 0.2em;
  ${media.largerPhone`margin: .4em;`};
  ${media.tablet`margin: 1em 2.5em;`};
  ${media.laptop`margin: 1em 2.5em;`};
  .row {
    margin: 0;
    .col {
      padding: 0;
      .questionCount {
        position: relative;
        padding: 1em;
        font-size: 1em;
        font-family: ${fonts.$latoFont};
        color: ${colors.$colorGold};
        ${media.largerPhone`font-size: 1.2em;`};
      }
    }
  }
`

const QuestionCount = props => {
  return (
    <Wrapper>
      <div className="row">
        <div className="col">
          <div className="questionCount">
            Question <span>{props.counter}</span> of <span>{props.total}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}


setUserAnswer(answer) {
    const answersCount = this.state.answersCount
    let applyAnswer = answer => {
      const answer_array = answer.split(',')
      let briggsAnswer = answer_array[0]
      let colorsAnswer = answer_array[1]
      let lettersAnswer = answer_array[2]
      if (answer_array.length === 3) {
        answersCount['Briggs'][briggsAnswer] += 1
        answersCount['Colors'][colorsAnswer] += 1
        answersCount['Letters'][lettersAnswer] += 1
      } else if (answer_array.length === 4) {
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


  getBriggsResults() {
    const answerCount = this.state.answersCount
    const briggsAnswer = answerCount['Briggs']
    const answersCountKeysBriggs = Object.keys(briggsAnswer)
    const answersCountValuesBriggs = answersCountKeysBriggs.map(key => briggsAnswer[key])
    let briggsType = ''
    if (briggsAnswer.E >= briggsAnswer.I) {
      briggsType += 'E'
    } else briggsType += 'I'
    if (briggsAnswer.S >= briggsAnswer.N) {
      briggsType += 'S'
    } else briggsType += 'N'
    if (briggsAnswer.T >= briggsAnswer.F) {
      briggsType += 'T'
    } else briggsType += 'F'
    if (briggsAnswer.J >= briggsAnswer.P) {
      briggsType += 'J'
    } else briggsType += 'P'
    return briggsType
  }


  getColorsResults() {
    const answersCount = this.state.answersCount
    const colorsAnswer = answersCount['Colors']
    const answersCountKeysColors = Object.keys(colorsAnswer)
    const answersCountValuesColors = answersCountKeysColors.map(key => colorsAnswer[key])
    const maxAnswerCountColors = Math.max.apply(null, answersCountValuesColors)
    return answersCountKeysColors.filter(key => colorsAnswer[key] === maxAnswerCountColors)
  }


  getLettersResults() {
    const answersCount = this.state.answersCount
    const lettersAnswer = answersCount['Letters']
    const answersCountKeysLetters = Object.keys(lettersAnswer)
    const answersCountValuesLetters = answersCountKeysLetters.map(key => lettersAnswer[key])
    const maxAnswerCountLetters = Math.max.apply(null, answersCountValuesLetters)
    return answersCountKeysLetters.filter(key => lettersAnswer[key] === maxAnswerCountLetters)
  }


  setResults(resultColors, resultLetters, resultBriggs) {
    if (resultColors.length >= 1) {
      this.setState({ resultColors: resultColors[0] })
    }
    if (resultLetters.length >= 1) {
      this.setState({ resultLetters: resultLetters[0] })
    }
    if (resultBriggs.length >= 1) {
      this.setState({ resultBriggs: resultBriggs })
    }
  }


  renderResult() {
    return (
      <Results
        resultColors={this.state.resultColors}
        resultLetters={this.state.resultLetters}
        resultBriggs={this.state.resultBriggs}
      />
    )
  }

  this.state = {
      showColorsResult: true,
      showLettersResult: false,
      showBriggsResult: false
    }


    renderResultColors() {
    return <Colors resultColors={this.props.resultColors} _onNextClick={this._onNextClick} />
  }

  renderResultLetters() {
    return <Letters resultLetters={this.props.resultLetters} _onNextClick={this._onNextClick} />
  }

  renderBriggsResult() {
    return <Briggs resultBriggs={this.props.resultBriggs} />
  }

  let showColorsResult = this.state.showColorsResult
    let showLettersResult = this.state.showLettersResult
    let showBriggsResult = this.state.showBriggsResult
    if (showColorsResult) {
      return this.renderResultColors()
    } else if (showLettersResult) {
      return this.renderResultLetters()
    } else if (showBriggsResult) {
      return this.renderBriggsResult()
    }
  }

  _onNextClick() {
    let showColorsResult = this.state.showColorsResult
    let showLettersResult = this.state.showLettersResult
    let showBriggsResult = this.state.showBriggsResult

    if (showColorsResult) {
      setTimeout(() => {
        this.setState({
          showColorsResult: !showColorsResult, // -> false
          showLettersResult: !showLettersResult // -> true
        })
      }, 800)
    } else if (showLettersResult) {
      setTimeout(() => {
        this.setState({
          showLettersResult: !showLettersResult, // false
          showBriggsResult: !showBriggsResult // true
        })
      }, 800)
    }
  }


  renderNextBtn() {
    return (
      <NextBtn onClick={this.props._onNextClick}>
        <span>Next</span>
        <div className="icon">
          <i className="fa fa-chevron-right" />
        </div>
      </NextBtn>
    )
  }

  renderBrownDef() {
    return (
      <BrownDef
        title={'Brown Type Definition'}
        content={`You are a Builder. You enjoy leading, creating and working hard.
                  You are a traditional person with respect for authority.
                  Your strengths are your diligence, directness and practicality.
                  Your weaknesses are your lack of tact, patience, and difficulty with abstractions.`}
        onBackClick={this.onBrownDefClick}
      />
    )
  }

  renderGreenDef() {
    return (
      <GreenDef
        title={'Green Type Definition'}
        content={`You are a Planner. You enjoy dreaming, plotting and innovating.
                  You tend to spend a lot of time thinking.
                  Your strengths are your vision, objectiveness and attention to detail.
                  Your weaknesses are your difficulty in putting yourself in the current moment and lack of practicality and speed.`}
        onBackClick={this.onGreenDefClick}
      />
    )
  }

  renderBlueDef() {
    return (
      <BlueDef
        title={'Blue Type Definition'}
        content={`You are a Relater. You enjoy chatting, romance and spending time with others.
                You are an empathetic person who tends to put the needs of others above your own.
                Your strengths are your sympathy, openness and awareness of your own emotions.
                Your weaknesses are your subjectivity, pliability and manipulability.`}
        onBackClick={this.onBlueDefClick}
      />
    )
  }


  let showColorsResult = this.state.showColorsResult
    let showLettersResult = this.state.showLettersResult
    let showBriggsResult = this.state.showBriggsResult
    if (showColorsResult) {
      return this.renderResultColors()
    } else if (showLettersResult) {
      return this.renderResultLetters()
    } else if (showBriggsResult) {
      return this.renderBriggsResult()
    }