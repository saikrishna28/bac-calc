import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BACCalculator = () => {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [numDrinks, setNumDrinks] = useState(1);
  const [alcoholPercent, setAlcoholPercent] = useState(5);
  const [drinkVolume, setDrinkVolume] = useState(330); // in ml
  const [hours, setHours] = useState(1);
  const [bac, setBAC] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCalculate = () => {
    const r = gender === "male" ? 0.73 : 0.66;
    const weightPounds = parseFloat(weight) * 2.20462;
    const totalAlcoholMl = numDrinks * drinkVolume * (alcoholPercent / 100);
    const totalAlcoholOz = totalAlcoholMl * 0.033814;
    const alcoholOunces = totalAlcoholOz * 0.789;

    const calculatedBAC =
      (alcoholOunces * 5.14) / (weightPounds * r) - 0.015 * hours;
    setBAC(Math.max(0, calculatedBAC).toFixed(3));
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        BAC Calculator
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="Gender"
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Number of Drinks"
        type="number"
        value={numDrinks}
        onChange={(e) => setNumDrinks(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Alcohol % per Drink"
        type="number"
        value={alcoholPercent}
        onChange={(e) => setAlcoholPercent(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Drink Volume (ml)"
        type="number"
        value={drinkVolume}
        onChange={(e) => setDrinkVolume(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Hours Since First Drink"
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate BAC
      </Button>

      {bac !== null && (
        <Box textAlign="center" mt={3}>
          <Typography variant="h6">
            Estimated BAC: <strong>{bac}</strong>
          </Typography>
          {parseFloat(bac) < 0.03 ? (
            <Typography color="success.main">
              You are under the legal limit in India (0.03%)
            </Typography>
          ) : (
            <Typography color="error.main">
              You are above the legal limit in India. Do not drive.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BACCalculator;
