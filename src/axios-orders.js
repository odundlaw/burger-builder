import axios from "axios";

let cancelToken = null;

const setCancelToken = (token)=> {
  cancelToken = token;
}

const instance = axios.create({
  baseURL: "https://burger-builder-ef917-default-rtdb.firebaseio.com/",
  cancelToken: cancelToken?.token,
});

export default instance;
export { setCancelToken, cancelToken };
