import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

export default function PopularPeople() {
  const [people, setPeople] = useState([]);
  // const { state } = useLocation();

  console.log(people, "people");
  useEffect(() => {
    fetchFromApi("/person/popular?language=en-US&page=1").then((res) => {
      setPeople(res.results);
      console.log(people, "state");
    });
  }, []);

  return (
    <Box className="people-box">
      <Navbar />
      <h1 style={{ color: "white" }}>Popular People</h1>
      <div className="person-card">
        {people.map((person) => (
          <Card sx={{ width: 270 }} key={person.id}>
            <CardMedia
              sx={{ height: 380 }}
              image={`https://image.tmdb.org/t/p/w220_and_h330_face/${
                person.profile_path ? person.profile_path : person.backdrop_path
              }`}
              title={person.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {person.name}
              </Typography>
              {person.known_for.map((el) => (
                <Typography
                  key={el}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {el.title ? `${el.title},` : `${el.name}`}
                </Typography>
              ))}
            </CardContent>
            {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
          </Card>
        ))}
      </div>
    </Box>
  );
}
