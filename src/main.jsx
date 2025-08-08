import { createRoot } from "react-dom/client";
import App from './App'
import './styles/reset.scss'
import './styles/Normalize.scss'


const container = document.querySelector("#app");
const root = createRoot(container);

root.render(
     <App />
)