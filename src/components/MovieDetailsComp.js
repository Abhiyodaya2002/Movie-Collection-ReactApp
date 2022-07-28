import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components"

const Container=styled.div`
display: flex;
flex-direction:row;
padding : 20px 30px;

border-bottom:1px solid lightgrey;
@media screen and (max-width:500px)
{
    display: flex;
flex-direction:column;
}
`;
const CoverImage=styled.img`
height:340px;
object-fit:cover;
`
const Infocolumn=styled.div`
display:flex;
flex-direction:column;
margin: 20px;
`
const MovieName=styled.span`
font-size:18px;
font-weight: 600;
color:black;
margin:10px 0px;
white-space:nowrap;
text-overflow:ellipsis;
overflow :hidden;
`
const MovieInfo=styled.span`
font-size:16px;
font-weight: 500;
color:black;
margin:4px 0px;
white-space:wrap;
text-overflow:ellipsis;
overflow :hidden;
& span{
    opacity:0.7;

}
`
const Close=styled.span`
margin:2px;
font-size:20px;
font-weight:600;
color:black;
padding :4px;
background-color:lightgrey;
cursor:pointer;
height:fit-content;
border-radius:5px;
@media screen and (max-width:500px)
{
width:fit-content;
}
`


export default function MovieDetailsComp(props) {
    
    const [movieInformation,setMovieInformation]=useState();
    useEffect(()=>{
     axios.get(`http://www.omdbapi.com/?i=${props.selectedMovie}&apikey=f7b56733`).then((response)=>{
       setMovieInformation(response.data);
     })
    },[props.selectedMovie]);
  return (
    <Container >
        {movieInformation?<>
        <CoverImage src={movieInformation?movieInformation.Poster:''}></CoverImage>
        <Infocolumn>
            <MovieName>{movieInformation?movieInformation.Title:''}</MovieName >

            <MovieInfo>Realeased Date: <span>{movieInformation?movieInformation.Released:''}</span></MovieInfo>
            <MovieInfo>IMDB Rating: <span>{movieInformation?movieInformation.imdbRating:''}</span></MovieInfo>
            <MovieInfo>Language: <span>{movieInformation?movieInformation.Language:''}</span></MovieInfo>
            <MovieInfo>Genre: <span>{movieInformation?movieInformation.Genre:''}</span></MovieInfo>
            <MovieInfo>Director: <span>{movieInformation?movieInformation.Director:''}</span></MovieInfo>
            <MovieInfo>Actors: <span>{movieInformation?movieInformation.Actors:''}</span></MovieInfo>
            <MovieInfo>Plot: <span>{movieInformation?movieInformation.Plot:''}</span></MovieInfo>
        </Infocolumn>
        <Close  onClick={()=>{
           props.setSelectedMovie('');
        }}>X</Close>
        </>
        :"Loading.."}
    </Container>
        
  )
}
