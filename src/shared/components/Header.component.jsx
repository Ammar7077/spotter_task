import { Box, Typography, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderButtonComponent } from "./HeaderButton.component";
import { RouterConstants } from "../../main";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

//* I can make the buttons clickable and navigate to the clickable route
export const HeaderComponent = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      {isSmallScreen ? (
        <Box sx={{ height: 58 }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: "grey", position: "absolute", top: 10, left: 10 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                height: "100%",
                width: 250,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                bgcolor: "grey.800",
              }}
            >
              {Object.entries(RouterConstants).map(([key, value]) => (
                <HeaderButtonComponent
                  key={key}
                  isClicked={location.pathname === value.path}
                  icon={value.icon}
                  title={value.name}
                />
              ))}
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            flex: 1,
            display: "inline-flex",
            gap: 2,
            alignItems: "center",
            px: 5,
            py: 1,
            borderBottom: 0.1,
          }}
        >
          <Typography sx={{ color: "white", fontSize: "20px" }}>
            Google
          </Typography>
          {Object.entries(RouterConstants).map(([key, value]) => (
            <HeaderButtonComponent
              key={key}
              isClicked={location.pathname === value.path}
              icon={value.icon}
              title={value.name}
            />
          ))}
        </Box>
      )}
    </div>
  );
};
