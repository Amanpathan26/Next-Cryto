"use client"

import { AccountCircleRounded, SearchRounded } from "@mui/icons-material";
import { Box, Container, filledInputClasses, IconButton, InputAdornment, inputBaseClasses, TextField, Typography } from "@mui/material";
import { useState, FormEvent } from "react";

interface Params {
  getName: (name: string) => void;
  symbol: string;
}

const Header = ({ getName, symbol }: Params) => {

  const [value, setValue] = useState<string>("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    getName(value);

  }

  return (
    <Container
    component="header"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "wrap",
      padding: "1rem",
    }}>
      <Typography 
      variant="h4" 
      component="h2"
      sx={{"@media (max-width: 768px)":{
        width: '50%'
      }}}
      >
        Crypto
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: "2",
          "@media (max-width: 768px)":{
            width: '100%',
            order: "3"
          }
        }}
        component="form"
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          id="filled-suffix-shrink"
          label="Search Coin"
          variant="filled"
          color="primary"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            width: '70%',
            "@media (max-width: 768px)":{
            width: '100%',
            margin: ".6rem 0"
          }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    alignSelf: 'flex-end',
                    opacity: 0,
                    pointerEvents: 'none',
                    [`.${filledInputClasses.root} &`]: {
                      marginBottom: '.5px',
                    },
                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                      opacity: 1,
                    },
                  }}
                >
                  {symbol}
                </InputAdornment>
              ),
            },
          }}
        />
        <IconButton color="primary" type="submit"><SearchRounded /></IconButton>
      </Box>

      <Box
        component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            "@media (max-width: 768px)":{
            width: '50%',
            order: "2",
            justifyContent: "flex-end"
          }}}
        >
        <IconButton ><AccountCircleRounded fontSize="large"/></IconButton>
        <h4>John</h4>
      </Box>

    </Container>
  )
}

export default Header