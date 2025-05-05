import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({
  imageUrls,
}: {
  imageUrls: Array<Promise<string>>;
}) => {
  return (
    <ImageList
      sx={{ width: "100%", height: 350 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {imageUrls.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={`${image}`}
            srcSet={`${image}`}
            alt={"Note Image"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
