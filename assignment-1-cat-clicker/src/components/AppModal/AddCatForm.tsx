import { useState, useRef, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface FormValues {
    name: string;
    age: string;
    nicknames: string;
    clicks: number;
    image?: File;
}

const NewForm = () => {

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
        console.log(formValues);
    };

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
            />
            <TextField
                name="age"
                label="Age"
                variant="outlined"
                value={formValues.age}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                name="nicknames"
                label="Nicknames"
                variant="outlined"
                value={formValues.nicknames}
                onChange={handleInputChange}
                fullWidth
            />
            <TextField
                name="clicks"
                label="Clicks"
                variant="outlined"
                type="number"
                value={formValues.clicks}
                fullWidth
                onChange={(event) =>
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        ageNumber: parseInt(event.target.value),
                    }))
                }
            />


            <Button variant="contained" type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default NewForm;
