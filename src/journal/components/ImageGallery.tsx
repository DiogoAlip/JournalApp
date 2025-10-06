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
      {imageUrls.map((image, index) => {
        const imageString = String(image);
        return (
          <ImageListItem key={`${index}-${image}`}>
            <img
              src={`${imageString}`}
              srcSet={`${imageString}`}
              alt={"Note Image"}
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
