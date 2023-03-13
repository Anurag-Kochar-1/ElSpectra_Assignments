import { useState, useEffect } from 'react';
import {
    List,
} from '@mui/material';
import ListCard from './ListCard';
import { ICat } from '../../interfaces/ICatInterface';

const SidebarList = ({ allCats }: { allCats: ICat[] }) => {

    return (
        <List>
            {allCats?.map((cat) => (
                <ListCard cat={cat} />
            ))}
        </List>
    )
}

export default SidebarList