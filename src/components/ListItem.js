import React, { useContext } from 'react';
import { moviesContext } from '../context/moviesContext';
import useMovie from '../hooks/useMovie';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function ListItem({ movie, setOpen }) {
  const movies = useContext(moviesContext);
  const [getDetails, res] = useMovie();
  const handleClick = async () => {
    if (movies.movie.id !== movie.id) {
      movies.setMovie({});
      const res = await getDetails(movie.id);
      if (res !== undefined) {
        setTimeout(() => {
          movies.setMovie(res);
        }, 200);
      }
    } else {
      setOpen(true);
    }
  }
  return (
    <Card style={{width: '100%', padding: 15, borderRadius: 0}}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : 'https://via.placeholder.com/600x300?text=NO+PICTURE'}
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h5">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            <StarBorderIcon style={{ position: 'relative', top: 4, right: 5 }} fontSize="small" />
            {movie.vote_average} / 10
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.vote_count} vote{movie.vote_count > 1 && 's'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  )
}