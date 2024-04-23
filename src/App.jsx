import DashBoard from "./ui/DashBoard";
import DeckMap from "./ui/Map";
import './App.css'
import LocationContextProvider from "./store/LocationContext";
import StatsMenuContextProvider from "./store/StatsMenuContextProvider";


export default function App(){
  return(
    <LocationContextProvider>
      <StatsMenuContextProvider>
        <DeckMap />
        <DashBoard />
      </StatsMenuContextProvider>
    </LocationContextProvider>
  );
}