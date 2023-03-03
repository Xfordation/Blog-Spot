import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
  descriptionLength?: number;
}

const Cards = ({
  image,
  title,
  description,
  link,
  descriptionLength,
}: Props) => {
  return (
    <Link
      href={link}
      style={{
        textDecoration: "none",
      }}
    >
      <Card sx={{ m: "2rem 0", height: "100%", display: "flex" }}>
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {descriptionLength === 0
                ? description
                : `${description.substring(0, descriptionLength)}...`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

// Default Props
Cards.defaultProps = {
  descriptionLength: 0,
};

export default Cards;
