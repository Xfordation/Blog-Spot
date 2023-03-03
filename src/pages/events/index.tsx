import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { Container, Stack } from "@mui/system";
import Cards from "@/components/Cards";
import { Grid, Typography } from "@mui/material";

interface props {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}

const Events = ({ data }: props) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h2">
        Events Around The World
      </Typography>
      <Grid container columnSpacing={5} rowSpacing={5}>
        {data?.map(({ id, image, title, description }) => (
          <Grid item key={id} xs={12} sm={6} md={4} lg={4}>
            <Cards
              image={image}
              title={title}
              description={description}
              link={`/events/${id}`}
              descriptionLength={400}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events;

export const getStaticProps: GetStaticProps = async () => {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
};
