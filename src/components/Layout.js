import React, { useContext, useEffect, useState } from 'react';
import List from './List';
import Details from './Details';
import SearchBar from './SearchBar';
import { useMediaQuery } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { moviesContext } from '../context/moviesContext';


export default function Layout() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [genreBool, setGenreBool] = useState(false);
    const [resDetails, setResDetails] = useState({});
    const [actualQuery, setActualQuery] = useState('');
    const movies = useContext(moviesContext);
    useEffect(() => {
        setOpen(true);
    }, [movies.movie])
    const matches = useMediaQuery('(min-width:750px)');
    return (
        <div style={{maxWidth: '100vw', overflow: 'hidden', display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <div style={{ display: "flex", flexDirection: matches ? 'row' : 'column', maxWidth: '1000px', width: '100%', justifyContent: matches && 'center'}}>
                <div style={{width: matches ? '35%' : '100%', margin: matches ? 20 : 0}}>
                    <SearchBar setGenreBool={setGenreBool} genreBool={genreBool}  setPage={setPage} actualQuery={actualQuery} resDetails={resDetails} setResDetails={setResDetails} page={page} setActualQuery={setActualQuery}/>
                    <List actualQuery={actualQuery} page={page} setPage={setPage} resDetails={resDetails} setOpen={setOpen}/>
                </div>
                <Slide direction="top" in={movies.movie.title && open}>
                    <div style={{ width: matches ? '65%' : '100%', position: (!matches && open) ? 'absolute' : 'relative', background: 'white', display: ((!open || !movies.movie) && !matches) && 'none'}}>
                        <Details setGenreBool={setGenreBool} setActualQuery={setActualQuery} setOpen = {setOpen} setResDetails={setResDetails} setPage={setPage} />
                    </div>
                </Slide>
            </div>

        </div>
    )
}