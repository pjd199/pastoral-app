import { useContext, useEffect, useState } from 'react';

import Feed from '../components/Feed';
import NotePad from '../components/NotePad';
import styles from '../styles/Home.module.css';

import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout, { SearchContext } from '../components/Layout';
import Navbar from '../components/Navbar';
import ClientSideRender from '../components/ClientSideRender';

import pouchDBFind from 'pouchdb-find';
import PouchDB from 'pouchdb';
import { Provider } from 'use-pouchdb';

PouchDB.plugin(pouchDBFind);
const localDatabase = new PouchDB('pastoral-app');

export default function Home(props) {
    return (
        <Layout>
            {/*<label htmlFor="search">search</label>
            <input
                type="search"
                id="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            */}
            <ClientSideRender>
                <Provider pouchdb={localDatabase}>
                    <Stack direction="column">
                        <Feed sort="time" />
                        <NotePad />
                    </Stack>
                </Provider>
            </ClientSideRender>
        </Layout>
    );
}
