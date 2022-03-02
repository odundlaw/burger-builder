import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-ef917-default-rtdb.firebaseio.com/",
});

export default instance;