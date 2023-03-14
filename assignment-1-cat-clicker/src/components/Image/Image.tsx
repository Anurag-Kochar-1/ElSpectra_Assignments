import { Box } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface IProps {
    src: string;
    alt: string;
    width: string;
    height: string;
};

const Image = ({ src, alt, width, height }: IProps) => {
    return (
        <Box sx={{ width, height }}>
            <LazyLoadImage
                effect="blur"
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{ objectFit: "contain" }}
            />
        </Box>
    );
};

export default Image;
