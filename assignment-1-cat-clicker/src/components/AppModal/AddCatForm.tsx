import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setAllCats } from '../../redux/slices/catSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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
    const { allCats } = useSelector((state: RootState) => state.cat)
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        age: '',
        nicknames: '',
        clicks: 0,
        image: undefined,
    });
    const [imagePreview, setImagePreview] = useState<any>(null)

    const imageInputRef = useRef<HTMLInputElement | null>(null)

    const createImagePreview = () => {
        if (formValues?.image) {
            setImagePreview(URL?.createObjectURL(formValues?.image));
        }
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

    const addCat = async (downloadURL: string) => {
        const catsCollectionRef = collection(db, 'cats')
        const res = await addDoc(catsCollectionRef, {
            id: "",
            catName: formValues.name,
            catAge: formValues.age,
            catImageURL: downloadURL,
            catNickNames: [formValues.nicknames],
            clickTimes: formValues.clicks
        })

        await updateDoc(res, {
            id: res?.id
        })

        dispatch(setAllCats([...allCats, {
            id: res.id,
            catName: formValues.name,
            catAge: formValues.age,
            catImageURL: downloadURL,
            catNickNames: [formValues.nicknames],
            clickTimes: formValues.clicks
        }]))


        setIsFormSubmitting(false)
        handleModalClose()
    }



    useEffect(() => {
        createImagePreview()
    }, [formValues.image])


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
                    border: "2px solid black",
                    borderRadius: 3,
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
                    <Box>
                        <Typography variant="overline" display="block" gutterBottom>
                            Upload Image
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
                Submit
            </Button>
        </Box>
    );
};

export default AddCatForm;
