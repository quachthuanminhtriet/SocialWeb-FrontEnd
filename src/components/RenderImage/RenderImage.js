import React, { useEffect, useState } from "react";

const RenderImage = ({
  src,
  containerWidth,
  containerHeight,
  aspectRatios,
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    name: "",
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Tính tỷ lệ khung hình của hình ảnh hiện tại
    const imageAspectRatio = containerWidth / containerHeight;

    // Hàm điều chỉnh tỷ lệ hình ảnh
    const adjustImageToAspectRatio = (width, height, aspectRatios) => {
      let bestFit = null;
      let closestRatioDifference = Infinity;

      aspectRatios.forEach((ratio) => {
        const targetAspectRatio = ratio.ratioX / ratio.ratioY;
        const ratioDifference = Math.abs(imageAspectRatio - targetAspectRatio);

        if (ratioDifference < closestRatioDifference) {
          closestRatioDifference = ratioDifference;
          bestFit = ratio;
        }
      });

      if (bestFit) {
        const targetWidth = bestFit.ratioX;
        const targetHeight = bestFit.ratioY;

        const scale = Math.min(width / targetWidth, height / targetHeight);

        return {
          name: bestFit.name,
          width: targetWidth * scale,
          height: targetHeight * scale,
        };
      }

      return null;
    };

    // Điều chỉnh hình ảnh dựa trên kích thước container và tỷ lệ
    const adjustedImage = adjustImageToAspectRatio(
      containerWidth,
      containerHeight,
      aspectRatios
    );

    if (adjustedImage) {
      setImageDimensions({
        name: adjustedImage.name,
        width: adjustedImage.width,
        height: adjustedImage.height,
      });
    }
  }, [containerWidth, containerHeight, aspectRatios]);

  return (
    <img
      src={src}
      width={imageDimensions.width}
      height={'auto'}
      alt={imageDimensions.name}
    />
  );
};

export default RenderImage;
