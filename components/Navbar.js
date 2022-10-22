import styled from '@emotion/styled';
import {
    AppBar,
    Container,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
} from '@mui/material';
import { alpha, Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { SearchContext } from './Layout';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar(props) {
    const searchValue = React.useContext(SearchContext);

    return (
        <AppBar position="sticky" top="0">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', md: 'block' } }}
                >
                    Pastoral App
                </Typography>
                <Container maxWidth="sm">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={(e) =>
                                props.onSearchValueChange(e.target.value)
                            }
                        />
                    </Search>
                </Container>
                {/**
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}></Box>
                 */}
            </Toolbar>
        </AppBar>
    );
}
