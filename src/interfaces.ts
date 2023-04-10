import { QueryResult } from "pg";

interface IMovie {
    name: string;
    price: number;
    category: string;
    duration: number;
  }
  
interface IMovieData extends IMovie{
    id: number;
}


type IMovieResult = QueryResult<IMovie>;

export  {IMovie, IMovieData, IMovieResult}