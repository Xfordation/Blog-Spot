import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

interface props {
  data: {
    id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
  };
}

const DynamicEventPage = ({ data }: props) => {
  // State
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // useRouter Hook
  const router = useRouter();

  // Destructuring the Data
  const { image, title, description, city } = data;

  // Functions
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventID = router?.query.id;
    const validateEmailRegex =
      /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    if (!email.match(validateEmailRegex)) {
      setError(true);
      setErrorMessage("Enter a valid Email Address.");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
    } else {
      try {
        // Fetch
        const res = await fetch("/api/emailHandler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, eventID }),
        });
        const data = await res.json();

        if (!res.ok) {
          toast.warning(data.message);
        }

        if (res.ok) {
          toast.success(data.message);
          setEmail("");
        }
      } catch (error) {
        console.log(`Error ${error}`);
      }
    }
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h2" m="0.5rem 0">
        {title}
      </Typography>
      <Box width="100%" height="60vh" position="relative">
        <Image
          fill
          loading="eager"
          src={image}
          alt={title}
          style={{ objectFit: "cover", width: "100%" }}
        />
      </Box>

      <Typography variant="body1" component="p" m="2rem 0">
        {description}
      </Typography>
      <Divider />
      <Box paddingY="2rem">
        <Typography variant="h3" component="h3">
          Want to be Notified for this Event?
        </Typography>

        <ToastContainer theme="dark" />

        <Stack
          component="form"
          direction="row"
          alignItems="center"
          gap="2rem"
          pt="1rem"
          justifyContent="left"
          onSubmit={onSubmit}
        >
          <TextField
            label="Enter your Email"
            variant="standard"
            size="medium"
            color="secondary"
            sx={{ width: "25%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            helperText={errorMessage}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={email.length >= 3 ? false : true}
          >
            Register Now
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default DynamicEventPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { allEvents } = await import("../../../data/data.json");
  const allPaths = allEvents.map(({ id, city }) => {
    return {
      params: {
        category: city,
        id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { allEvents } = await import("../../../data/data.json");
  const id = context.params.id;
  const data = allEvents.find((events) => events.id === id);

  return {
    props: {
      data: data,
    },
  };
};
