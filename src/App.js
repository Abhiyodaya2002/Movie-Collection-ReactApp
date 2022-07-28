import styled from "styled-components"
import MovieComponent from "./components/MovieComponent";
import MovieDetailsComp from "./components/MovieDetailsComp";
import './App.css';
import { useState } from "react";
import axios from "axios";


//these are components with an attached css hence first letter must be in upper case
const Container=styled.div`
display: flex;
flex-direction:column;

`;
const Header=styled.div`
@media screen and (max-width: 500px)
{
  display:flex;
flex-direction:column;
} 
display:flex;
flex-direction:row;
background-color:black;
color:white;
padding :10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
justify-content:space-between;
align-items:center;


`
const Appname=styled.div`
display : flex;
flex-direction:row;
align-items:center;
@media screen and (max-width: 500px)
{
  margin-right:17px;
 
}
`
const Image=styled.img`
height:48px;
width:48px;
margin 15px;
@media screen and (max-width: 500px)
{
  margin-right:26px;
  transform: rotate(90deg);
}
`
const SearchBox=styled.div`
display:flex;
flex-direction:row;
padding:10px 10px;
background-color:white;
border-radius:6px;
margin-left: 20px;
width:50%;
align-items: center;
@media screen and (max-width: 500px)
{
  width:258px;
  margin:11px;
  margin-right:13px;
}
`
const Searchicon=styled.img`
width:32px;
height:32px;

`
const Searchinput=styled.input`
color:black;
font-size:16px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;
@media screen and (max-width: 500px)
{
  width:190px;
}

`
const MovieListContainer=styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:space-evenly;
padding:30px;
gap:20px;
`

const DefaultBackgroundImg=styled.img`
height:120px;
  width:120px;
  margin:150px;
  opacity:0.7;
`



function App() {

   const [searchMovie,setSearchMovie]=useState('');
   const [timeoutID,setTimeoutID]=useState();
   const [movieList,setmovieList]=useState();
  const [selectedMovie,setSelectedMovie]=useState();
   async function callApi(searchMovie)
{
  const res =await axios.get(`http://www.omdbapi.com/?s=${searchMovie}&apikey=f7b56733`);
 // console.log(res.data.Search);
  setmovieList(res.data.Search);
}
function  OnSearch(event)
{
  clearTimeout(timeoutID);
  setSearchMovie(event.target.value);
  
  let timeout=setTimeout(()=>{
    callApi(event.target.value);
  },850);
  setTimeoutID(timeout);
}

  return (
    <Container>
       <Header>
       <Image src="movie-icon.svg">
</Image>
<Appname>Movie Collection App
</Appname>
<SearchBox placeholder="Enter the movie name">
  <Searchicon src="search-icon.svg"></Searchicon>
  <Searchinput placeholder="Enter the movie name" value={searchMovie} onChange={OnSearch}></Searchinput>
</SearchBox >
       </Header>
{
 selectedMovie && <MovieDetailsComp selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}></MovieDetailsComp>
}

<MovieListContainer>


{movieList?movieList.map((element) => (
        <MovieComponent title={element.Title} year={element.Year} type={element.Type} image={element.Poster} setMovie={setSelectedMovie} id={element.imdbID}></MovieComponent>
      )):
      <DefaultBackgroundImg src="movie-icon.svg"></DefaultBackgroundImg>
      
    }

      </MovieListContainer>
    </Container>
  );
}

export default App;
