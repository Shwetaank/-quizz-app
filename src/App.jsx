import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-100 to-red-100  ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
