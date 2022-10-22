import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { usePouch } from 'use-pouchdb';
/**
 * Add the note to the database
 * @param  {} database
 * @param  {} title
 * @param  {} text
 */
function addNote(database, title, text) {
    database
        .post({
            title: title,
            text: text,
            time: Date.now(),
        })
        .catch(console.error);
}

/**
 * Render the Notepad component
 * @param  {} props
 */
export default function NotePad(props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const database = usePouch();

    return (
        <Box>
            <Stack direction="column">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="text">Text</label>
                <textarea
                    type="textbox"
                    rows="5"
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={() => addNote(database, title, text)}>
                    Add
                </button>
            </Stack>
        </Box>
    );
}
