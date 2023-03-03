import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container, height } from "@mui/system";
import { Grid, Stack, Typography } from "@mui/material";
import Cards from "@/components/Cards";
interface props {
  data: {
    id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: string[];
  }[];
  details: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}

const EventPerCity = ({ data, details }: props) => {
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography variant="h2" component="h2">
          {details?.title}
        </Typography>
        <Box width="100%" height="60vh" position="relative">
          <Image
            fill
            loading="eager"
            src={details?.image}
            alt={details?.id}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Box>
        <Typography variant="body1" component="p" m="2rem 0">
          {details.description}
        </Typography>
      </Box>
      <Grid container columnSpacing={5} rowSpacing={5}>
        {data.map(({ id, image, title, description, city }) => (
          <Grid item key={id} xs={12} sm={6} md={4} lg={4}>
            <Cards
              image={image}
              title={title}
              description={description}
              link={`
              /events/${city}/${id}
              `}
              descriptionLength={350}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventPerCity;

export const getStaticPaths: GetStaticPaths = async () => {
  const { events_categories } = await import("../../../data/data.json");
  const allPaths = events_categories.map(({ id }) => {
    return {
      params: {
        category: id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.category;
  const { events_categories, allEvents } = await import(
    "../../../data/data.json"
  );
  const data = allEvents.filter((events) => events.city === id);
  const details = events_categories.find((events) => events.id === id);
  return {
    props: {
      data,
      details,
    },
  };
};
