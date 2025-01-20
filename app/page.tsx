'use client';

import Header from "./components/Header";
import React from 'react'
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, List, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Image from "next/image";
import { KeyboardBackspace } from "@mui/icons-material";
import { apiData } from './Data/apiData';



interface ApiData {
  id: string; 
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}

export default function Home() {


  const [filterData, setFilterData] = useState<ApiData | null>(null);
  const [fetchedData, setFetchedData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [slide, setSlide] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiData();
        if (data !== null) {
          setFetchedData(data); 
          setLoading(false);
        } 
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);
  


  const getName = async (inputName: string): Promise<void> => {
    const filteredData = fetchedData.find(item => item.name.toLowerCase() === inputName.toLowerCase());
    setFilterData(filteredData || null);
  };

  return (
    <div>

      <Header symbol={filterData?.symbol || "Coin"} getName={getName} />

      <Container
        component="main"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "85vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container
          component="div"
          sx={{
            width: "50%",
            height: "100%",
            position: "relative",
            padding: '0',
            alignContent: "center",
            border: "1px solid",
            borderRadius: "1rem 0 0 1rem",
            backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
            "@media (max-width:768px)": {
              position: "absolute",
              inset: "0 0 0 0",
              width: "calc(100% - 30px)"
            }
          }}
        >
          <Box
            sx={{
              borderRadius: "8px",
              padding: "1rem",
              margin: "0 auto",
              width: "18rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundImage: "linear-gradient(0deg, #ffffff50, #ffffff80)",
              backdropFilter: "blur(10px)",
              "@media (max-width:600px)": {
                fontSize: '14px',
                width: "14rem"
              }
            }}
          >
            {filterData ? (
              <List
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,

                }}
              >
                <li>
                  <Image
                    loading="lazy"
                    src={filterData.image}
                    alt={filterData.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%", margin: "0 auto" }}
                  />
                </li>
                <li>
                  <strong>Name:</strong> {filterData.name}
                </li>
                <li>
                  <strong>Symbol:</strong> {filterData.symbol || "Unknown"}
                </li>
                <li>
                  <strong>Current Price:</strong> ${filterData.current_price || "Unknown"}
                </li>
                <li>
                  <strong>Market Cap:</strong> ${filterData.market_cap || "Unknown"}
                </li>
                <li>
                  <strong>Total Volume:</strong> ${filterData.total_volume || "Unknown"}
                </li>
              </List>
            ) : (
              <p>Please either search or choose a coin from the list.</p>
            )}
          </Box>

          <KeyboardBackspace
            onClick={() => { setSlide(!slide) }}
            sx={{
              position: "absolute",
              top: "0",
              right: '0',
              zIndex: "9999",
              cursor: "pointer",
              display: "none",
              backgroundColor: "black",
              color: "#fff",
              transition: "all .5s",
              borderRadius: slide ? "0 7px 0 0" : "7px 0 0 7px",
              transform: slide ? "rotate(180deg)" : "rotate(0deg)",
              "@media (max-width:768px)": {
                display: "block",

              }
            }}
          />
        </Container>

        <Container
          component="div"
          sx={{
            border: "1px solid black",
            position: "relative",
            width: '50%',
            overflow: "auto",
            transition: "all .5s ease-in-out",
            backgroundColor: "#fff",
            "@media (max-width:768px)": {
              width: '100%',
              border: "1px solid black",
              right: slide ? "0" : "-110%",
            }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'grid', placeItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{
                    "@media (max-width:320px)": {
                      padding: '10px 0'
                    }
                  }}>Name</TableCell>
                  <TableCell sx={{
                    "@media (max-width:320px)": {
                      padding: '10px 0'
                    }
                  }}>Current Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedData.map((item, i) => (
                  <TableRow
                    key={i}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setFilterData(item);
                      setSlide(false);
                    }}
                  >
                    <TableCell sx={{
                      "@media (max-width:320px)": {
                        padding: '0'
                      }
                    }}>{item.name}</TableCell>
                    <TableCell sx={{
                      "@media (max-width:320px)": {
                        padding: '10px 0'
                      }
                    }}>${item.current_price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Container>

      </Container>
    </div>
  );
}
