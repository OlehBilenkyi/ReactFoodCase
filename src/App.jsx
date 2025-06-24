import { Routes, Route } from "react-router-dom";
import ModalProvider from "./components/OrderFeatures/ModalManager/ModalManager";
import { Header, Footer } from "@layouts";
import { appRoutes } from "./routes";

const App = () => (
  <ModalProvider>
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  </ModalProvider>
);

export default App;
