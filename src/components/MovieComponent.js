import styled from "styled-components"

import React from 'react'
const MovieContainer=styled.div`
display:flex;
flex-direction:column;
padding : 10px;
width:280px;
cursor:pointer;
box-shadow: 0 3px 10px #aaa;
`
const MovieImage=styled.img`
height:362px;
object-fit:cover;

`
const MovieName=styled.span`
font-size:18px;
font-weight: 600;
color: white;
margin:10px 0px;
/* Suppose if the name in span is very big then  it will come in next line too.....*/
white-space:nowrap; /*to avoid text to come in next line */
text-overflow:ellipsis; /*Gives three dots at the end of line if it is going out of the box*/
overflow:hidden; /*hides the overflow content --- text-overflow and overflow hidden are used together*/
`
const Info=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`
const MovieInfo=styled.span`
font-size:16px;
font-weight:500;
color:white;
`

export default function MovieComponent(props) {
  return (
    <MovieContainer onClick={()=>{props.setMovie(props.id)}}>
 <MovieImage src={props.image}/>
 <MovieName>{props.title}</MovieName>
 <Info>
  <MovieInfo>Year: {props.year}</MovieInfo>
  <MovieInfo>Type: {props.type}</MovieInfo>
 </Info>
    </MovieContainer>
  )
}
