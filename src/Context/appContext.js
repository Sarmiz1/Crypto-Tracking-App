import { createContext } from "react";

const appContext = createContext({
  tabValue: 0,
  setTabvalue: null,
  handleTabChange: null,
})

export default appContext