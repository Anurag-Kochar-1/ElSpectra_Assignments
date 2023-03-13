import Box from '@mui/material/Box/Box'
import { useSelector } from 'react-redux';
import Gallery from '../../components/Gallery/Gallery'
import { RootState } from '../../redux/store';

const HomePage = () => {
  const { allCats, status, error } = useSelector((state: RootState) => state.cat);

  return (
    <Box
      sx={{ width: "100%", }}
    >
      <Gallery
        allCats={allCats}
        status={status}
        error={error}
        page={"HOMEPAGE"}
        title={"Gallery"}
      />
    </Box>
  )
}

export default HomePage