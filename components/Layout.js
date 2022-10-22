import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export const SearchContext = React.createContext();

export default function Layout(props) {
    const [searchValue, setSearchValue] = useState('Note 10');
    return (
        <SearchContext.Provider value={searchValue}>
            <Box bgcolor={'background.default'} color={'text.primary'}>
                <Navbar onSearchValueChange={(value) => {setSearchValue(value)}}/>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Sidebar />
                    <Box sx={{ flexGrow: 3 }}>{props.children}</Box>
                </Stack>
            </Box>
        </SearchContext.Provider>
    );
}
