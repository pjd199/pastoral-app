import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';

export default function Sidebar(props) {
    return (
        <Box
            flex={1}
            p={2}
            sx={{
                display: { xs: 'none', md: 'block' },
                minWidth: '13em',
                maxWidth: '13em',
            }}
            bgcolor="lightgray"
        >
            <Box position="fixed" bgcolor="white">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
