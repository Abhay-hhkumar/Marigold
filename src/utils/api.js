import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDNiNWNjNjdhMTZjN2QyMTc3YjkyZWZkZTM5MjBkNiIsInN1YiI6IjY1NzQ4ZDRjYTg0YTQ3MDBmZTBkZmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GbeUNA3HGIaH642VIGFY5H8Tykw3aOZGHa61noYsZB4";

const headers = {
    Authorization : "bearer " + TMBD_TOKEN,
};

export const fetchDataFromApi = async (url, params)=>{
try{
const {data} = await axios.get(BASE_URL + url, {
    headers: headers,
    params: params
})
return data;
} catch (err) {
    console.log(err);
    return err;
}
}

