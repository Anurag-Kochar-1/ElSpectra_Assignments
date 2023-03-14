import React, { useState, useEffect } from "react"
import { setCat } from "../../redux/slices/catSlice";
import {
  Box,
  Button,
  TextField,
  ButtonGroup,
  IconButton
} from '@mui/material';
import { ICat } from '../../interfaces/ICatInterface';
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Toast from "../Toast/Toast";


const AppForm = ({ cat, handleModalOpen }: { cat: ICat, handleModalOpen: () => void }) => {
  const dispatch = useDispatch()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [catName, setCatName] = useState<string | number>(cat?.catName)
  const [catClickTimes, setCatClickTimes] = useState<number>(cat?.clickTimes)
  const [catImageURL, setCatImageURL] = useState<string>(cat?.catImageURL)
  const [catNickNames, setCatNickNames] = useState<string[]>(cat?.catNickNames)
  const [catAge, setCatAge] = useState<string>(cat?.catAge)

  const editCat = async () => {
    const catDocRef = doc(db, 'cats', cat?.id)
    await updateDoc(catDocRef, {
      catAge,
      catImageURL,
      catName,
      catNickNames,
      clickTimes: catClickTimes,
      createdAt: ""
    })
  }


  const resetForm = () => {
    setCatName(cat?.catName)
    setCatClickTimes(cat?.clickTimes)
    setCatImageURL(cat?.catImageURL)
    setCatNickNames(cat?.catNickNames)
    setCatAge(cat?.catAge)
  }

  const handleToastClick = () => {
    setIsSnackbarOpen(true);
  };

  const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    setCatClickTimes(cat?.clickTimes)
  }, [cat])



  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow={4}
      width={400}
      height={500}
      padding={2}
    >
      <Button size="medium" variant='outlined' color="primary" onClick={handleModalOpen}>Open new form</Button>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { marginY: 2, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Cat Name" variant="outlined" value={catName} onChange={(e) => setCatName(e?.target?.value)} />
        <TextField id="outlined-basic" label="Cat Image" variant="outlined" value={catImageURL} onChange={(e) => setCatImageURL(e?.target?.value)} />
        <TextField id="outlined-basic" label="Cat Clicks" variant="outlined" type={"number"} value={catClickTimes} onChange={(e) => setCatClickTimes(parseInt(e?.target?.value))} />

        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}>
          <Button color='error' variant='contained'
            onClick={resetForm}
          >Undo</Button>

          <Button color='success' variant='contained' onClick={() => {
            editCat()
            handleToastClick()
            dispatch(setCat({
              catName: catName,
              clickTimes: catClickTimes,
              catImageURL: catImageURL,
              catNickNames: catNickNames,
              catAge: catAge,
              id: cat?.id
            }))
          }}>Save</Button>

          <Toast
            isSnackbarOpen={isSnackbarOpen}
            handleToastClick={handleToastClick}
            handleToastClose={handleToastClose}
            message={"Changes Saved"}
            autoHideDuration={3000}
          />
        </ButtonGroup>



      </Box>
    </Box>
  )
}

export default AppForm