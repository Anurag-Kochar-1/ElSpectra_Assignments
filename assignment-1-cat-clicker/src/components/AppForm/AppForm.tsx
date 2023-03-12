import {
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  ButtonGroup

} from '@mui/material';


const AppForm = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow={5}
      width={400}
      padding={2}
    // sx={{backgroundColor: "red"}}
    >

      {/* <Paper elevation={3} /> */}

      <Button size="medium" variant='outlined' color="primary">Open new form</Button>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { marginY: 2, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Cat Name" variant="outlined" defaultValue={"Billa"} />
        <TextField id="outlined-basic" label="Cat Image" variant="outlined" defaultValue={'cat/image'} />
        <TextField id="outlined-basic" label="Cat Click" variant="outlined" defaultValue={10} />

        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}>
          <Button color='error' variant='contained'>Undo</Button>
          <Button color='success' variant='contained'>Save</Button>
        </ButtonGroup>

      </Box>
    </Box>
  )
}

export default AppForm