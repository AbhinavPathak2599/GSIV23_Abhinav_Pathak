import React,{useEffect,useState} from "react";
import {AppBar,Toolbar,Box,Typography,TextField,Card, Grid,CardActions,CardContent,CardHeader,CardMedia,CardActionArea} from "@mui/material";
import MovieImage from "./assets/images/Movie.jpg";


function App() {
  const [movieList,setMovieList]=useState([]);
  const [searchedList,setSearchedList]=useState([]);
  const [movieName,setMovieName]=useState("");
  useEffect(()=>{

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjVhMDI2NTAyNmM0NTVjNzUxNDAxYzBkN2VjNWE5OSIsInN1YiI6IjY0ZGY4ZjBiYWFlYzcxMDNmOTk3ODNmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D6IcL5y4x1J2lqYrkYLIODBlyBun6Aa1ieMhK-JQILw'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=20', options)
      .then(response => response.json())
      .then(response => {console.log(response);

      setMovieList(response.results)}
      )

      .catch(err => console.error(err));
  },[])

  const handleChange=(e)=>{
setMovieName(e.target.value);
  }

  useEffect(()=>{
    if(movieName!==""){
      movieList.forEach((x,i)=>{
        if(movieList[i].title.includes(movieName)===true){
          setSearchedList([{...movieList[i]}])
        }
      })
    }
    else{
      setSearchedList([])
    }
   
  },[movieName])
  return (
    <div>
        {/* <h1>Movie App</h1> */}

        <AppBar position="static" style={{color:"white",backgroundColor:"black"}}>
          <Toolbar>
          <Typography variant="h6" mr={160}>Movie App</Typography>
          <TextField style={{backgroundColor:"white",border:2}} label="Search by Movie Name"
          value={movieName}
          onChange={handleChange}
          />


          </Toolbar>
        </AppBar>
<br />
<Box>
  <Grid container spacing={2}>
    
    {searchedList.length>0?searchedList.map((x,key)=>(
      <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
    <Card sx={{height:290,width:300,backgroundColor:"smokywhite"}}>
      {/* <CardHeader>

      </CardHeader> */}
      <CardMedia
        component="img"
        height="160"
       // image={x.poster_path}
      //  alt="/static/images/cards/paella.jpg"
        sx={{backgroundImage:`url('${MovieImage}')`}}
       
      />

   
      {/* <CardContent>

      </CardContent> */}
<CardActions>
      <Typography>{x.title}</Typography>
      {/* <div style={{marginLeft:"125px"}}> */}
      <Typography>{x.popularity}</Typography>
      {/* </div> */}
   
    
      </CardActions>
      <CardActionArea sx={{padding:2}}>
   <Typography>{x.overview}</Typography>
   </CardActionArea>
    </Card>

    </Grid>
    )):   
    movieList.map((x,key)=>(
      <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
    <Card sx={{height:290,width:300,backgroundColor:"smokywhite"}}>
      {/* <CardHeader>

      </CardHeader> */}
      <CardMedia
        component="img"
        height="160"
       // image={x.poster_path}
      //  alt="/static/images/cards/paella.jpg"
        sx={{backgroundImage:`url('${MovieImage}')`}}
       
      />

   
      {/* <CardContent>

      </CardContent> */}
<CardActions>
      <Typography>{x.title}</Typography>
      {/* <div style={{marginLeft:"125px"}}> */}
      <Typography>{x.popularity}</Typography>
      {/* </div> */}
   
    
      </CardActions>
      <CardActionArea sx={{padding:2}}>
   <Typography>{x.overview}</Typography>
   </CardActionArea>
    </Card>

    </Grid>
    ))
    }
  </Grid>
  

</Box>
        </div>
         

  
  );
}

export default App;
