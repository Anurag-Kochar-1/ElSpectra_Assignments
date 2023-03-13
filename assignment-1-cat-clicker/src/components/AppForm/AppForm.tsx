import {
  Box,
  Button,
  Stack,
  TextField,
  ButtonGroup

} from '@mui/material';
import { ICat } from '../../interfaces/ICatInterface';


const AppForm = ({ cat }: { cat: ICat }) => {


  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow={4}
      width={400}
      padding={2}
    >


      <Button size="medium" variant='outlined' color="primary">Open new form</Button>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { marginY: 2, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Cat Name" variant="outlined" value={cat?.catName} />
        <TextField id="outlined-basic" label="Cat Image" variant="outlined" value={'cat/image'} />
        <TextField id="outlined-basic" label="Cat Clicks" variant="outlined" value={cat?.clickTimes} />

        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}>
          <Button color='error' variant='contained' onClick={() => console.log(cat)}>Undo</Button>
          <Button color='success' variant='contained'>Save</Button>
        </ButtonGroup>

      </Box>
    </Box>
  )
}

export default AppForm