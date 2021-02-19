import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import "./index.js"
import styled from 'styled-components'

//SIMPLE STYLES

const StyledExplanation = styled.p`


`

const StyledH2 = styled.h2`
  font-size:2.3rem;
  
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-in;
  }
  transition: all 0.5s ease-in-out;



`
const StyledDiv = styled.div`
  display:flex;
  flex-flow:column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  

`

const StyledCP = styled.p`
  color:black;
  font-size:.8rem;



`
const StyledH1 = styled.h1`
  color: #7278AD;
  font-size:3rem;

  &:hover {
    color: #003874;
    transform: scale(1.2);
    transition: all 0.3s ease-in;
  }
  transition: all 0.3s ease-in-out;

`
const StyledNasaImg = styled.div`
  color: red;    
  font-family: sans-serif;
  
    
`




function App() {
    const [data, setData] = useState([]);

    //  API
    const fetchData = () => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2012-03-14`)
        .then(res => {
            console.log(res);
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    //  Use Effect
    useEffect(fetchData, [])

    //  Nasa Image Component
    function NasaImg(props) {
      return (
        <a href={props.hdurl} target='_blank'>
        <img 
          src={props.url}
          alt={props.title}
        />
        </a>
      )
    }

    //  Nasa Image Explanation Component
    function NasaExp(props) {
      return (
        <StyledExplanation>
          {props.explanation}
        </StyledExplanation>
      )
    }

    //  Nasa HD Link Component
    function NasaHD(props) {
      return (
        <a href={props.hdurl} target='_blank'>View in HD</a>
      )
    }

    //  Nasa Image Info Component
    function NasaImgInfo(props) {
      return (
        <StyledNasaImg>
          <NasaExp explanation={props.explanation}/>
          <NasaHD hdurl={props.hdurl} />
          <StyledCP>Copyright &#169;{props.copyright}</StyledCP>
        </StyledNasaImg>
      )
    }




    //  Final Output
    return (
      
      <StyledDiv>
        <StyledH1>NASA's Photo of the Day</StyledH1>
        <NasaImg 
          url={data.url} 
          alt={data.title} 
          hdurl={data.hdurl} 
        />
        
        <StyledH2>{data.title}</StyledH2>
        <NasaImgInfo 
          copyright={data.copyright} 
          explanation={data.explanation} 
          hdurl={data.hdurl} 
        />
      </StyledDiv>
    )
}

export default App;