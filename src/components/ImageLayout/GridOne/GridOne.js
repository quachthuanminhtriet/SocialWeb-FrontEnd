import React from "react";
import RenderImage from "../../RenderImage/RenderImage";

const GridOne = ({ media }) => {
  const aspectRatios = [
    {
      name: "SHARED_LINK",
      ratioX: 1200,
      ratioY: 628,
    },
    {
      name: "IMAGE",
      ratioX: 1200,
      ratioY: 800,
    },
    {
      name: "IMAGE_HORIZONTAL",
      ratioX: 1200,
      ratioY: 630,
    },
    {
      name: "IMAGE_VERTICAL",
      ratioX: 960,
      ratioY: 1440,
    },
    {
      name: "IMAGE_SQUARE",
      ratioX: 960,
      ratioY: 960,
    },
  ];

  return (
    <div className="GridOne" width="100%" >
      <RenderImage src={media.url} containerWidth={media.width} containerHeight={media.height} aspectRatios={aspectRatios} />
    </div>
  );
};

export default GridOne;
