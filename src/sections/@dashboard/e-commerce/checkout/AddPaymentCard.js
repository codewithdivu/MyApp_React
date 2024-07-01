import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const AddPaymentCard = () => {
  const [cardType, setCardType] = useState('');

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    const data = new FormData(event.currentTarget);
    console.log({
      cardType: data.get('cardType'),
      cardNumber: data.get('cardNumber'),
      cardName: data.get('cardName'),
      expiryDate: data.get('expiryDate'),
      cvv: data.get('cvv'),
    });
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5" align="center">
          Card Information
        </Typography>
        <StyledForm noValidate onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="cardType-label">Card Type</InputLabel>
            <Select
              labelId="cardType-label"
              id="cardType"
              name="cardType"
              value={cardType}
              onChange={handleCardTypeChange}
              label="Card Type"
              required
            >
              <MenuItem value="rupay">Rupay</MenuItem>
              <MenuItem value="mastercard">Mastercard</MenuItem>
              <MenuItem value="visa">Visa</MenuItem>
              <MenuItem value="amex">American Express</MenuItem>
              <MenuItem value="discover">Discover</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cardNumber"
            label="Card Number"
            name="cardNumber"
            autoComplete="cc-number"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cardName"
            label="Name on Card"
            name="cardName"
            autoComplete="cc-name"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="expiryDate"
                label="Expiry Date"
                name="expiryDate"
                autoComplete="cc-exp"
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cvv"
                label="CVV"
                name="cvv"
                autoComplete="cc-csc"
                type="password"
              />
            </Grid>
          </Grid>
          <StyledButton type="submit" fullWidth variant="contained" color="primary">
            Pay Now
          </StyledButton>
        </StyledForm>
      </Box>
    </StyledContainer>
  );
};

export default AddPaymentCard;
