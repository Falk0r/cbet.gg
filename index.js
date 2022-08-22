// let betAnalytix = import("./betAnalytix");
import betAnalytix from "./betAnalytix";
let { cbet } = import("./cbets");

window.onload = () => {
  const path = window.location.hostname;
  if (path === "app.bet-analytix.com") {
    return betAnalytix;
  } else {
    return cbet;
  }
} 