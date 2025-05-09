import { Box, Typography } from "@mui/material";
import { FlightSearchCardComponent } from "../shared/components/FlightSearchCard.component";

export default function Flights() {
  return (
    <Box sx={{ flex: 1, height: "100lvh" }}>
      <Box
        sx={{
          flex: 1,
          display: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minWidth: "570px",
          top: 0,
        }}
      >
        <img src="https://developers.google.com/static/travel/flights/images/flights.svg" />
      </Box>
      <Typography
        align="center"
        color="grey.800"
        sx={{
          WebkitBackgroundClip: "text",
          fontWeight: "simibold",
          fontSize: { xs: "40px", sm: "60px" },
          mt: { xs: -8, sm: -13 },
        }}
      >
        Flights
      </Typography>
      <FlightSearchCardComponent />
    </Box>
  );
}
