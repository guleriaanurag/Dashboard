import DashBoard from "./ui/DashBoard";
import DeckMap from "./ui/Map";
import './App.css'
import LocationContextProvider from "./store/LocationContext";


export default function App(){
  return(
    <LocationContextProvider>
      <DeckMap />
      <DashBoard />
    </LocationContextProvider>
  );
}