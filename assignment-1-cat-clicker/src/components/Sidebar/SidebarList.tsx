import {
    List,
} from '@mui/material';
import ListCard from './ListCard';
import { ICat } from '../../interfaces/ICatInterface';

const SidebarList = ({ allCats }: { allCats: ICat[] }) => {

    return (
        <List>
            {allCats?.map((cat) => (
                <ListCard key={cat?.id} cat={cat} />
            ))}
        </List>
    )
}

export default SidebarList