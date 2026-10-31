
import Header from "./components/Header";

import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="flex min-h-screen">
      <Header />
      <main className="flex justify-center items-center flex-1">
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
