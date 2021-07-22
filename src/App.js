import React, {useState, useEffect} from 'react';
import { Grid } from "@material-ui/core";
import {Details} from './components/Details/Detail.js';
import './App.css';

function App() {
  return (
    <div className = 'app'>
      <Grid container spacing = {3}>
        <Grid item sm={12} xs={12}>
          <div>
            IPL Matches Reuslts
          </div>
        </Grid>
        <Grid item sm={12} xs={12}>
          <div>
              <Details />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
