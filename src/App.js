import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Character } from './features/starwars/Character';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
        <header className="App-header">
        </header>
        <main className="App-container">
          <section>
            <Character />
          </section>
        </main>
    </ThemeProvider>
  );
}

export default App;
