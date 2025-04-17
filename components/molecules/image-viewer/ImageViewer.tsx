import { Image } from "react-native";

import { FlexibleImageBox } from "./ImageViewer.style";

interface ImageViewerProps {
  imageUri: string;
}

const ImageViewer = ({ imageUri }: ImageViewerProps): JSX.Element => {
  return (
    <FlexibleImageBox>
      <Image
        source={{ uri: imageUri }}
        resizeMode="contain"
        style={{ width: "100%", height: 400 }}
      />
    </FlexibleImageBox>
  );
};

export default ImageViewer;
