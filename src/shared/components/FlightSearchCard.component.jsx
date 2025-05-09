import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DateRangePicker } from "./DateRangePicker.component";
import { DropdownMenuComponent } from "./DropdownMenu.component";
import { Plane, Plus, Minus } from "lucide-react";
import { RestAPI } from "../../core/api/RestAPI";
import { format } from "date-fns";

export const FlightSearchCardComponent = () => {
  const [airports, setAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [selectedCabinClass, setSelectedCabinClass] = useState({
    name: "Echonomy",
    value: "echonomy",
    icon: <Plane />,
  });
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Passenger counts
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  async function fetchAirports(query) {
    setLoadingAirports(true);
    const response = await RestAPI.getRequest(
      `v1/flights/searchAirport?query=${query}&locale=en-US`
    );
    if (response.status === 200) {
      setAirports(response.data.data);
    }
    setLoadingAirports(false);
  }

  const handleSearch = async () => {
    if (!fromAirport || !toAirport || !startDate) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log(fromAirport);

    const query = new URLSearchParams({
      originSkyId: fromAirport.skyId,
      destinationSkyId: toAirport.skyId,
      originEntityId: fromAirport.entityId,
      destinationEntityId: toAirport.entityId,
      date: format(startDate, "yyyy-MM-dd"),
      ...(endDate && { returnDate: format(endDate, "yyyy-MM-dd") }),
      cabinClass: selectedCabinClass.value,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
      adults: adults.toString(),
      ...(children > 0 && { children: children.toString() }),
      ...(infants > 0 && { infants: infants.toString() }),
    });

    const response = await RestAPI.getRequest(
      `v2/flights/searchFlights?${query}`
    );

    console.log("Search Response:", response.data);
  };

  useEffect(() => {
    if (fromAirport) fetchAirports(fromAirport);
  }, [fromAirport]);

  useEffect(() => {
    if (toAirport) fetchAirports(toAirport);
  }, [toAirport]);

  return (
    <Box>
      <Box
        backgroundColor="grey.800"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          mx: "auto",
          borderRadius: 3,
          my: 10,
          px: 5,
          py: 5,
          boxShadow: 10,
        }}
      >
        {/* Cabin Class Dropdown */}
        <DropdownMenuComponent
          items={[
            { name: "Economy", value: "economy", icon: <Plane /> },
            {
              name: "Premium Economy",
              value: "premium_economy",
              icon: <Plane />,
            },
            { name: "Business", value: "business", icon: <Plane /> },
            { name: "First", value: "first", icon: <Plane /> },
          ]}
          onClick={setSelectedCabinClass}
        />

        {/* Airports Autocomplete */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Autocomplete
            disablePortal
            options={loadingAirports ? [] : airports}
            sx={{ width: "48%" }}
            autoHighlight
            getOptionLabel={(option) => option.navigation.localizedName}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, gap: 1 }}
                {...props}
              >
                {option.navigation.localizedName}
                <Typography variant="body2" color="gray">
                  {option.navigation.entityType}
                </Typography>
              </Box>
            )}
            onChange={(event, value) => setFromAirport(value)} // Save the selected object
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                onChange={(event) => {
                  if (event.target.value) {
                    fetchAirports(event.target.value); // Fetch airports dynamically
                  }
                }}
              />
            )}
          />
          <Autocomplete
            disablePortal
            options={loadingAirports ? [] : airports}
            sx={{ width: "48%" }}
            autoHighlight
            getOptionLabel={(option) => option.navigation.localizedName}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 }, gap: 1 }}
                {...props}
              >
                {option.navigation.localizedName}
                <Typography variant="body2" color="gray">
                  {option.navigation.entityType}
                </Typography>
              </Box>
            )}
            onChange={(event, value) => setToAirport(value)} // Save the selected object
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                onChange={(event) => {
                  if (event.target.value) {
                    fetchAirports(event.target.value); // Fetch airports dynamically
                  }
                }}
              />
            )}
          />
        </Box>

        {/* Date Range Picker */}
        <DateRangePicker setStart={setStartDate} setEnd={setEndDate} />

        {/* Passengers Dropdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {[
            { label: "Adults", count: adults, setCount: setAdults },
            { label: "Children", count: children, setCount: setChildren },
            { label: "Infants", count: infants, setCount: setInfants },
          ].map(({ label, count, setCount }) => (
            <Box key={label} sx={{ textAlign: "center" }}>
              <Typography variant="body2">{label}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setCount(Math.max(0, count - 1))}
                  disabled={count === 0}
                >
                  <Minus size={16} />
                </IconButton>
                <Typography>{count}</Typography>
                <IconButton size="small" onClick={() => setCount(count + 1)}>
                  <Plus size={16} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        sx={{
          flex: 1,
          display: "flex",
          width: "150px",
          mx: "auto",
          mt: -2,
          borderRadius: 10,
          py: 1.2,
          bgcolor: fromAirport && startDate ? "#8AB4F7" : "gray",
          color: "white",
          boxShadow: 10,
        }}
        disabled={!fromAirport || !toAirport || !startDate}
      >
        Explore
      </Button>
    </Box>
  );
};
