import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initailizeAuthenticion = () => {
     initializeApp(firebaseConfig);
}

export default initailizeAuthenticion;
