import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setAllCats } from '../../redux/slices/catSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Toast from '../Toast/Toast';
import ImageIcon from '@mui/icons-material/Image';

interface IProps {
    handleModalClose: () => void
    isFormSubmitting: boolean
    setIsFormSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
    name: string;
    age: string;
    nicknames: string;
    clicks: number;
    image?: File;
}

const AddCatForm = ({ handleModalClose, isFormSubmitting, setIsFormSubmitting }: IProps) => {
    const dispatch = useDispatch()
    const { allCats, cat } = useSelector((state: RootState) => state.cat)
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        age: '',
        nicknames: '',
        clicks: 0,
        image: undefined,
    });
    const [imagePreview, setImagePreview] = useState<any>(null)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const imageInputRef = useRef<HTMLInputElement | null>(null)

    const createImagePreview = () => {
        if (formValues?.image) {
            setImagePreview(URL?.createObjectURL(formValues?.image));
        }
    }

    const getCatAgeName = () => {
        if (cat?.clickTimes <= 5) return `Infant`
        else if (formValues?.clicks > 5 && formValues?.clicks <= 12) return `Child`
        else if (formValues?.clicks >= 13 && formValues?.clicks <= 25) return `Young`
        else if (formValues?.clicks >= 26 && formValues?.clicks <= 40) return `Middle-Age`
        else if (formValues?.clicks >= 41 && formValues?.clicks <= 60) return `Old`
        else if (formValues?.clicks >= 61) return `Very Old`
        return `Old`
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFormValues((prevValues) => ({
                ...prevValues,
                image: file,
            }));
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // addCat() => WORKS IN uploadImage() 
        uploadImage()
    };

    const uploadImage = () => {
        if (formValues?.image) {
            setIsFormSubmitting(true)
            const imageRef = ref(storage, "catImages/" + Date.now() + "--" + formValues?.image?.name)
            const uploadImageMedia = uploadBytesResumable(imageRef, formValues?.image)

            uploadImageMedia.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`upload is ${progress}% done`);
            }, (error) => {
                alert(error)
            }, () => {
                getDownloadURL(uploadImageMedia.snapshot.ref).then((downloadURL) => {
                    addCat(downloadURL)
                    // console.log(`URL IS ${downloadURL}`);
                })
            })
        }
    }

    const addCat = async (downloadURL: string = `https://th.bing.com/th/id/OIP.9ZA116H2sgefzH9D2BQJBwHaHa?pid=ImgDet&rs=1`) => {
        const currentDate = new Date();

        // Format date as "day month name year"
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        const catsCollectionRef = collection(db, 'cats')
        const ageName = getCatAgeName()
        const res = await addDoc(catsCollectionRef, {
            id: "",
            catName: formValues.name,
            catAge: ageName,
            catImageURL: downloadURL,
            catNickNames: [formValues.nicknames],
            clickTimes: formValues.clicks,
            createdAt: ""
        })

        await updateDoc(res, {
            id: res?.id
        })

        dispatch(setAllCats([...allCats, {
            id: res.id,
            catName: formValues.name,
            catAge: ageName,
            catImageURL: downloadURL,
            catNickNames: [formValues.nicknames],
            clickTimes: formValues.clicks,
            createdAt: ""
        }]))


        setIsFormSubmitting(false);
        handleModalClose();
        handleToastClick();
        window.location.href = window?.location?.origin
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
        createImagePreview()
    }, [formValues.image])


    useEffect(() => {
        setFormValues({
            name: cat?.catName,
            age: '',
            nicknames: cat?.catNickNames.toString(),
            clicks: cat?.clickTimes,
            image: undefined,
        })
    }, [cat])





    return (
        <Box
            sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "start",
                alignItems: "center",
                gap: 2,
                marginTop: 3,
            }}
            component="form"
            onSubmit={handleSubmit}
        >



            <Box
                sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: 'white',
                    border: "2px solid gray",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={() => {
                    if (imageInputRef.current !== null) {
                        imageInputRef?.current.click()
                        // alert(imageInputRef.current)
                    }
                }}
            >
                <input title="input" type="file" accept="image/*" onChange={handleFileUpload} ref={imageInputRef} style={{ display: "none" }} />

                {!imagePreview && (
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }}>
                        <ImageIcon />
                        <Typography variant="overline" display="block" gutterBottom>
                            Upload an Image
                        </Typography>
                    </Box>
                )}

                {imagePreview && (
                    <img src={imagePreview} alt="preview" style={{ width: "100%", height: "100%" }} />
                )}
            </Box>

            <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={formValues.name}
                onChange={handleInputChange}
                fullWidth
                required
            />
            <TextField
                name="age"
                label="Age"
                variant="outlined"
                value={formValues.age}
                onChange={handleInputChange}
                fullWidth
                required
            />
            <TextField
                name="nicknames"
                label="Nicknames"
                variant="outlined"
                value={formValues.nicknames}
                onChange={handleInputChange}
                fullWidth
                required
            />
            <TextField
                name="clicks"
                label="Clicks"
                variant="outlined"
                type="number"
                value={formValues.clicks}
                fullWidth
                required
                onChange={(event) =>
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        clicks: parseInt(event.target.value),
                    }))
                }
            />


            <Button variant="contained" type="submit">
                Create
            </Button>

            <Toast
                isSnackbarOpen={isSnackbarOpen}
                handleToastClick={handleToastClick}
                handleToastClose={handleToastClose}
                message={"New Cat Added"}
                autoHideDuration={3000}
            />
        </Box>
    );
};

export default AddCatForm;
