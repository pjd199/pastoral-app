import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { useFind, usePouch } from 'use-pouchdb';
import { SearchContext } from './Layout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import highlightWords from 'highlight-words';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Feed(props) {
    const searchValue = React.useContext(SearchContext);
    const { docs, error } = useFind({
        index: {
            fields: [props.sort],
        },
        selector: {
            // currently a bug in this version of pouchdb
            //"$or": [{title: {"$regex": searchValue}}, {text: {"$regex": searchValue}}],
            title: { $exists: true },
            text: { $regex: searchValue },
            time: { $exists: true },
        },
        sort: [props.sort],
    });

    /*
    $and: [
            { type: { $exists: true } },
            { type: { $eq: "sessions" } },
            { start_date: { $gt: true } },
            { start_date: { $eq: "2018-10-21" } }
          ]
    */
    const db = usePouch();
    if (error) {
        console.error(error);
        return <Typography>Error loading from database</Typography>;
    }

    if (docs.length == 0) {
        return <Typography>No records found</Typography>;
    }
    return (
        <List>
            {docs.map((doc) => (
                <ListItem key={doc._id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5">{doc.title}</Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {new Date(doc.time).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body">
                                {highlightWords({
                                    text: doc.text,
                                    query: '/([@#][a-zA-Z0-9]+)/',
                                }).map(({ text, match, key }) =>
                                    match ? (
                                        <Typography display="inline"  key={key}>
                                            <strong>{text}</strong>
                                        </Typography>
                                    ) : (
                                        <Typography display="inline" key={key}>{text}</Typography>
                                    ),
                                )}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() =>
                                    db.remove(doc).catch(console.error)
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                        {/*<CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>*/}
                    </Card>
                    {/*
                    <ListItemIcon>
                        <ArrowForwardIosIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <b>{row.title}</b> (
                        {new Date(row.time).toLocaleDateString()})
                        <p>{row.text}</p>
                    </ListItemText>
                    */}
                </ListItem>
            ))}
        </List>
        /*
        <ul>
            {docs.map((row) => (
                <li key={row._id}>
                    <b>{row.title}</b> (
                    {new Date(row.time).toLocaleDateString()}) <p>{row.text}</p>
                </li>
            ))}
        </ul>
        */
    );
}
