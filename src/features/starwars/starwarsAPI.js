import axios from "axios";

const API_STARWARS = process.env.REACT_APP_STARWARS_API;
console.log(API_STARWARS)

export async function fetchCharacters(){
  try{
    const requestsArr = Array.from({length: 9}, (_, i) => i + 1).map(pageNo => axios.get(`${API_STARWARS}/people?page=${pageNo}`));
    const response = await axios.all(requestsArr);
    return response.map(({ data }) => data.results).reduce((l, m) => [...l, ...m] , []);
  }catch(err){
    throw err;
  }
}

export async function fetchMovies(movieListUrls){
  try{
    const response = await axios.all(movieListUrls.map(movieUrl => axios.get(movieUrl)));
    return response.map(({ data }) => data);
  }catch(err){
    throw err;
  }
}
