import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"
import { Provider } from "react-redux"
import { store } from "./store"


export const Bike=()=> {


  return (
    <Provider store={store }>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </Provider>
  )
}


