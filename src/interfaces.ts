import { QueryResult } from "pg";

interface IMovie extends IMovieData {
  id: number;
  }
  
interface IMovieData{
    name: string;
    price: number;
    category: string;
    duration: number;
}


type IMovieResult = QueryResult<IMovie>;

export  {IMovie, IMovieData, IMovieResult}