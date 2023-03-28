//ser possível do back consumir requisições e se comunicar com o Frontend
import axios from "axios";

export const api = axios.create({
  baseURL: "https://mynotelife1-emanuelbeco.b4a.run", //o que mais se repete
});
