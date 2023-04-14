import express, { Application, json } from "express";
import { connectDatabase } from "./database";
import {
  createMovies,
  deleteMovie,
  getMovieByID,
  getMovies,
  updateMovie,
} from "./logic";
import { checkID, checkName } from "./middleware";

const app: Application = express();
app.use(json());

app.post("/movies", checkName, createMovies);
app.get("/movies", getMovies);
app.get("/movies/:id", checkID, getMovieByID);
app.patch("/movies/:id", checkID, checkName, updateMovie);
app.delete("/movies/:id", checkID, deleteMovie);

const HOST: string = "localhost";
const PORT: number = 3000;
const runningMsg: string = `Server running at http://${HOST}:${PORT}/`;

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(runningMsg);
});
