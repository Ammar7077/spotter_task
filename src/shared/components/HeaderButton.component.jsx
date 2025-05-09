import { Button, Typography } from "@mui/material";

export const HeaderButtonComponent = ({ title, icon, isClicked, onClick }) => {
  return (
    <Button
      sx={{
        gap: 1,
        alignItems: "center",
        border: 0.1,
        borderRadius: 10,
        py: 1.2,
        px: 2,
        borderColor: "gray",
        bgcolor: isClicked ? "#394456" : "transparent",
      }}
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ color: "white", fontSize: "13px" }}>{title}</Typography>
    </Button>
  );
};
