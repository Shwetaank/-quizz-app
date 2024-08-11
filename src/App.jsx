import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const { isLoaded, isSignedIn } = useUser();

  // Display a loading state while authentication status is being loaded
  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Redirect to sign-in page if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-red-100">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
