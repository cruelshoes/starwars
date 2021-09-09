import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCharactersAsync, fetchMoviesAsync, selectCharacterNames, isDataLoading, selectMovies } from './starwarsSlice';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

export function Character() {
  const [character, setCharacter] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchCharactersAsync());
  }, []);
  const characterList = useSelector(selectCharacterNames);
  const characterMovies = useSelector(selectMovies);
  const isLoading = useSelector(isDataLoading);
  const sortedMoviesDesc = [...characterMovies].sort((mov1, mov2) => new Date(mov2.release_date) - new Date(mov1.release_date));
  const lastMovie = sortedMoviesDesc && sortedMoviesDesc.length ? sortedMoviesDesc[0] : null;
  
  const handleChange = (e) => {
    const selectedCharacter = e.target.value;
    setCharacter(selectedCharacter);
    dispatch(fetchMoviesAsync(selectedCharacter));
  }
  return (
    <Container sx={{
      marginTop: '5vh'
    }}>
    <Box sx={{ 
      minWidth: 240,
    }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Character</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Character"
          value={character}
          onChange={handleChange}
        >
          {characterList.map((characterName, idx) => <MenuItem key={characterName + idx} value={characterName}>{characterName}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{
      minWidth: 240,
    }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-labelledby="list-subheader"
        component="nav"
        subheader={
          <ListSubheader component="div" id="list-subheader">
            Movies List
          </ListSubheader>
      }
      >
        {characterMovies.map((movie, idx) => <><ListItem key={movie.title+idx}>
                  <ListItemText
                    primary={movie.title}
                  />
        </ListItem>
        <Divider /></>)}
      </List>
    </Box>
    <Box>
      <Typography id="last-movie" variant="subtitle1" component="div" gutterBottom>
        Name/Year (Last Movie): 
      </Typography>
      <Typography id="last-movie-desc" aria-labelledby="last-movie last-movie-desc" variant="caption" component="div" gutterBottom>
        {lastMovie ? `${lastMovie.title} / ${new Date(lastMovie.release_date).getFullYear()}` : ''}
      </Typography>
    </Box>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
