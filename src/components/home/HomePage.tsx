import React from "react";
import Image from "next/image";
import Link from "next/link";
import Cards from "../Cards";
import { Container } from "@mui/material";
interface props {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}
const HomePage = ({ data }: props) => {
  return (
    <Container maxWidth="lg">
      {data?.map(({ id, image, title, description }) => (
        <Cards
          key={id}
          image={image}
          title={title}
          description={description}
          link={`/events/${id}`}
          descriptionLength={1000}
        />
      ))}
    </Container>
  );
};

export default HomePage;
