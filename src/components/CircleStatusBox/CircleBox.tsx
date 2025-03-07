import { Box } from "@mui/material";

const CircleBox = ({
  width,
  color,
  shadow = true,
}: {
  width: number;
  color: string;
  shadow?: boolean;
}) => {
  return (
    <Box
      sx={{
        width,
        height: width,
        background: color,
        borderRadius: "50%",
        boxShadow: shadow
          ? `0 0 20px 2px ${color}, 0 0 20px 1px ${color}, 0 0 10px 1px ${color}`
          : "none",
      }}
    ></Box>
  );
};

export default CircleBox;
