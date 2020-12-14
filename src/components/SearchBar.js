import React, { useContext, useEffect, useState } from 'react';
import useMovieQuery from '../hooks/useMovieQuery';
import { moviesContext } from '../context/moviesContext';
import Paper from '@material-ui/core/Paper';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useGenre from '../hooks/useGenre';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBar({ setGenreBool, genreBool, setPage, page, actualQuery, setActualQuery, setResDetails, resDetails }) {
    const classes = useStyles();
    const [searchGenre, resGenre] = useGenre();
    const movies = useContext(moviesContext);
    const [query, setQuery] = useState('');
    const handleClick = async () => {
        setGenreBool(0)
        setPage(1);
        setActualQuery(query);

        const data = await searchMovies(query + '&page=' + page);

        if (data !== undefined) {
            if (page > 1) {
                var newData = data;
                newData.results = newData.results.concat(movies.movies);
                console.log(newData)
                movies.setMovies(newData);
                setResDetails(newData);
            } else {
                movies.setMovies(data);
                setResDetails(data);
            }

        }
    }
    const handlePagination = async () => {
        if (genreBool === 0) {
            const data = await searchMovies(query + '&page=' + page);
            if (data !== undefined) {
                var newData = data;
                newData.results = movies.movies.concat(newData.results);
                console.log(newData)
                movies.setMovies(newData);
                setResDetails(newData);
            }
        } else {
            const data = await searchGenre(genreBool + '&page=' + page);
            if (data !== undefined) {
                var newData2 = data;
                newData2.results = movies.movies.concat(newData2.results);
                console.log(newData2)
                movies.setMovies(newData2);
                setResDetails(newData2);
            }
        }
    }
    useEffect(() => {
        if (page > 1) {
            handlePagination();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    const handleKeyDown = (e) => {
        
        if (e.key === 'Enter') {
            e.preventDefault()
            handleClick();
        }
    }
    const handleCancel = () => {
        movies.setMovies({ results: [] });
        setResDetails({});
        setPage(1);
    }
    const handleChange = (e) => {
        setQuery(e.target.value);
    }
    const [searchMovies, res] = useMovieQuery()
    return (
        <div style={{ width: '100%', overflowX: 'hidden', background: 'white'}}>
            <Paper component="form" className={classes.root}>
                {movies.movies[0] && (
                    <>
                        <IconButton className={classes.iconButton} onClick={handleCancel} aria-label="search">
                            <CloseRoundedIcon />
                        </IconButton>
                        <Divider orientation="vertical" className={classes.divider} />
                    </>
                )}
                <InputBase
                    className={classes.input}
                    value={query}
                    onChange={handleChange}
                    placeholder="Search a movie"
                    inputProps={{ 'aria-label': 'search a movie' }}
                    onKeyPress={handleKeyDown}
                />
                <IconButton className={classes.iconButton} onClick={handleClick} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {resDetails.total_results && (
                <>
                    <Typography style={{ paddingLeft: 15, paddingTop: 5 }} color="textSecondary">Results for "{actualQuery}"</Typography>
                    <Typography style={{ paddingLeft: 15 }} color="textSecondary">Total results: {resDetails.total_results === 10000 ? '10000+' : resDetails.total_results}</Typography>
                </>
            )}
        </div>
    )
}