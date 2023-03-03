import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        mt: "5rem",
        bottom: "0",
        top: "90%",
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Stack width="100%">
            <Typography
              variant="caption"
              component="p"
              textAlign="center"
              fontSize="16px"
            >
              © 2023 NextJS, Inc. All rights reserved.
            </Typography>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
