import React from "react";
import blockies from "ethereum-blockies";
import { Box } from "@mui/material";

const Avatar = ({ address, width }: { address: string; width: number }) => {
  const blockie = blockies.create({
    seed: address,
    size: 8,
    scale: 5,
  });

  return (
    <Box
      component={"img"}
      src={blockie.toDataURL()}
      sx={{ borderRadius: "50%", width, height: width }}
    />
  );
};

export default Avatar;
