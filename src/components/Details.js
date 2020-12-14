import React, { useContext } from 'react';
import { moviesContext } from '../context/moviesContext';
import Gallery from "./Gallery";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import EventIcon from '@material-ui/icons/Event';
import Chip from '@material-ui/core/Chip';
import useGenre from '../hooks/useGenre';
import Link from '@material-ui/core/Link';

export default function Details({ setGenreBool, setActualQuery, setResDetails, setOpen, setPage }) {
    const [openImage, setOpenImage] = React.useState(false);
    const [mouseEnter, setMouseEnter] = React.useState(false);
    const [searchGenre, res] = useGenre();
    const handleMouseEnter = () => {
        setMouseEnter(true);
    }
    const handleMouseLeave = () => {
        setMouseEnter(false)
    }
    const handleClickOpen = () => {
        setOpenImage(true);
        setMouseEnter(false);
    };

    const handleClose = () => {
        setOpenImage(false);
        setMouseEnter(false);
    };
    const handleGenre = async (e) => {
        setPage(1);
        var genreId = parseInt(e.target.parentElement.id);
        if (isNaN(genreId)) {
            genreId = parseInt(e.target.id);
        }
        console.log(genreId);
        setActualQuery("genre: " + e.target.innerText);
        setGenreBool(genreId);
        const data = await searchGenre(genreId);
        if (data !== undefined) {
            movies.setMovies(data);
            setResDetails(data);
        }
    }
    const movies = useContext(moviesContext);
    const movie = useContext(moviesContext).movie
    return (
        <div style={{ width: '100%', height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>

            <Fab onClick={() => { setOpen(false) }} color="primary" aria-label="add" style={{ position: 'absolute', right: 20, top: 10 }}>
                <CloseIcon fontSize='small' />
            </Fab>
            {movie.title && (
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <IconButton onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickOpen} size='small' style={{ position: 'relative' }}>
                            <ImageIcon fontSize='large' style={{ position: 'absolute', display: !mouseEnter && 'none', zIndex: 20 }} />
                            <img alt={movie.title} style={{ boxShadow: mouseEnter ? '3px 3px 3px 3px grey' : '1px 1px 1px 1px grey', filter: mouseEnter && 'grayscale(0.5)' }} width='100%' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Picture'} />
                            <Typography style={{ position: 'absolute', bottom: 0, backgroundColor: 'white', margin: 5, padding: 5, borderRadius: 50, color: 'black', opacity: mouseEnter ? 0.5 : 0.15 }} >Open Gallery</Typography>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component='h4' variant='h4' align='center' style={{ marginTop: 10 }}>
                            {movie.homepage ? <Link href={movie.homepage}>{movie.title}</Link> : movie.title}
                        </Typography>

                        <List component="nav" aria-label="contacts">
                            <ListItem button>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <ListItemText primary={movie.vote_average + ' / 10'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary={movie.vote_count + ' votes'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary={movie.release_date} />
                            </ListItem>
                            <div style={{ marginLeft: 10, marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'start', flexWrap: 'wrap', marginBottom: 20 }}>
                                {movie.genres && movie.genres.map((genre) => (
                                    <Chip value={genre.id} onClick={handleGenre} id={genre.id} label={genre.name} style={{ marginRight: 8, marginBottom: 10 }} />
                                ))}
                            </div>
                        </List>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={8}>

                            <Typography align='center' variant='h5' style={{ paddingBottom: 20 }}>
                                {movie.overview && "SYNOPSIS"}
                            </Typography>
                            <Typography style={{ marginBottom: 40 }}>
                                {movie.overview}
                            </Typography>
                            <Gallery handleClose={handleClose} handleClickOpen={handleClickOpen} open={openImage} />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                </Grid>)}

        </div>
    )
}