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
  Paper,
  Divider,
  Stack,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { alcoholData } from "../data/alcohol-bac";
import { volumePresets } from "../data/volume-presets";

const BACCalculator = () => {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [numDrinks, setNumDrinks] = useState(1);
  const [alcoholPercent, setAlcoholPercent] = useState(5);
  const [drinkVolume, setDrinkVolume] = useState(330);
  const [hours, setHours] = useState(1);
  const [bac, setBAC] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Beer");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [alcoholVolume, setAlcoholVolume] = useState("");

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCalculate = () => {
    const r = gender === "male" ? 0.73 : 0.66;
    const weightPounds = parseFloat(weight) * 2.20462;
    const totalAlcoholMl = numDrinks * drinkVolume * (alcoholPercent / 100);
    const totalAlcoholOz = totalAlcoholMl * 0.033814;
    const alcoholOunces = totalAlcoholOz * 0.789;
    const calculatedBAC =
      (alcoholOunces * 5.14) / (weightPounds * r) - 0.015 * hours;
    console.log(calculatedBAC);
    setBAC(Math.max(0, calculatedBAC).toFixed(3));
  };

  const categories = [...new Set(alcoholData.map((item) => item.category))];
  const brands = alcoholData.filter(
    (item) => item.category === selectedCategory
  );

  const volumePresetsForCategory = volumePresets.filter(
    (preset) => preset.category === selectedCategory
  );

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    const selected = alcoholData.find((item) => item.brand === brand);
    if (selected) {
      setAlcoholPercent(selected.abv);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f4f8", py: 4 }}>
      <Paper
        elevation={6}
        sx={{ p: 4, maxWidth: 500, mx: "auto", borderRadius: 4 }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <LocalBarIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" align="center" fontWeight="bold">
            BAC Calculator
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

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

        <FormControl fullWidth margin="normal">
          <InputLabel>Alcohol Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Alcohol Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedBrand("");
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCategory && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select
              value={selectedBrand}
              label="Brand"
              onChange={(e) => handleBrandChange(e.target.value)}
            >
              {brands.map((item) => (
                <MenuItem key={item.brand} value={item.brand}>
                  {item.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Stack direction="row" spacing={2} mt={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Choose Preset Volume</InputLabel>
            <Select
              value={alcoholVolume}
              label="Choose Preset Volume"
              onChange={(e) => {
                setAlcoholVolume(e.target.value);
                setDrinkVolume(e.target.value);
              }}
            >
              <MenuItem key="None" value="0">
                {"None"}
              </MenuItem>
              {volumePresetsForCategory.map((preset) => (
                <MenuItem key={preset.label} value={preset.volume}>
                  {preset.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Alcohol % per Drink"
            type="number"
            value={alcoholPercent}
            onChange={(e) => setAlcoholPercent(e.target.value)}
            margin="normal"
          />
        </Stack>
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
      </Paper>
    </Box>
  );
};

export default BACCalculator;
