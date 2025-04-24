import { Box, Typography } from "@mui/material";
import "./App.css";
import BACCalculator from "./components/BACCalculator";

function App() {
  return (
    <div className="App">
      <BACCalculator />
      <Box m={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Product of Sai Krishna Chimakurthi
        </Typography>
      </Box>
    </div>
  );
}

export default App;
