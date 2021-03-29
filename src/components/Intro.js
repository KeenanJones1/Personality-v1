import React from 'react'
import styled from 'styled-components'
import {StartBtn} from './utils/Buttons'
import { IntroCard } from './utils/Cards'
import {fonts, colors} from './utils/_var'
import { media } from './utils/_media-queries'

const Wrapper = styled.div`
  position: fixed;
  min-height: 100%;
  max-width: 100%;
  background: ${colors.$colorBg};
  h1 {
    position: relative;
    font-family: ${fonts.$titleFont};
    font-size: 1.1em;
    color: ${colors.$colorGold};
    text-align: center;
    padding-top: 2em;
    ${media.tablet`font-size: 1.5em; letter-spacing: 1.5px;`};
    ${media.laptop`font-size: 2em; letter-spacing: 2px;`};
  }
  
`


const Intro = ({title, handleStart}) => {
 return (
  <Wrapper className="container">
   <IntroCard>
    <div className="corner"/>
    <div className="corner"/>
    <div className="corner"/>
    <div className="corner"/>
    <h1>{title}</h1>
    <StartBtn  onClick={() => handleStart()}>
     <span>Let's Do This!</span>
     <div className="icon">
       <i className="fa fa-arrow-right"/>
     </div>
    </StartBtn>
   </IntroCard>
  </Wrapper>
 )
}

export default Intro
