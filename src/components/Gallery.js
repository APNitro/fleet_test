import React, { useContext } from 'react';
import { moviesContext } from '../context/moviesContext';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function Gallery({ open, handleClose, handleClickOpen }) {
    const classes = useStyles();
    const movie = useContext(moviesContext).movie;
    const [imageSelected, setImageSelected] = React.useState('');
    const [imageOpen, setImageOpen] = React.useState(false);

    const handleClickImageOpen = () => {
        setImageOpen(true);
    }
    const handleCloseImage = () => {
        setImageOpen(false);
    }

    return (
        <>
            <Dialog open={imageOpen} onClose={handleCloseImage} maxWidth='false'>
                <DialogContent>
                    <img style={{ maxHeight: '500px' }} src={`https://image.tmdb.org/t/p/original/${imageSelected}`} alt={imageSelected} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Pictures for " + `"` + movie.title + `"`}</DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        <GridList cellHeight={180} className={classes.gridList}>
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">Backdrops</ListSubheader>
                            </GridListTile>
                            {movie.images.backdrops.map((image) => (
                                <GridListTile style={{cursor: 'pointer'}}  key={image.file_path} onClick={() => { setImageSelected(image.file_path); handleClickImageOpen() }}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt={image.title} />
                                </GridListTile>
                            ))}
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <ListSubheader component="div">Posters</ListSubheader>
                            </GridListTile>
                            {movie.images.posters.map((image) => (
                                <GridListTile style={{cursor: 'pointer'}} key={image.file_path} onClick={() => { setImageSelected(image.file_path); handleClickImageOpen() }}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt={image.title} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}