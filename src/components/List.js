import React, { useContext, useEffect } from 'react';
import {moviesContext} from '../context/moviesContext';
import ListItem from './ListItem';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from '@material-ui/core';
export default function List({setPage, page, resDetails, setOpen, actualQuery}) {
    const handlePageClick = () => {
        setPage(page + 1);
    }
    useEffect(() => {
        if (page === 1) {
            setOpen(false);
            ref.current.firstElementChild.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: "start"
              });   
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualQuery])
    const ref = React.createRef();
    const movies = useContext(moviesContext).movies;
    const matches = useMediaQuery('(min-width:750px)');
    return (
        <div ref={ref} style={{width: '100%', maxHeight: matches ? '75vh' : '85vh', overflowY: 'scroll', overflowX: 'hidden', display: 'flex', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div></div>
            {movies && movies.map(movie => (
                <ListItem movie={movie} setOpen={setOpen}/>
            ))}

            {resDetails && page < resDetails.total_pages  && <Button style={{background: 'white', width: '100%', paddingBottom: 50}} onClick={handlePageClick}>Show more</Button>}
        </div>
    )
}