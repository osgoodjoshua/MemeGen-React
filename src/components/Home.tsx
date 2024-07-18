
const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <h1 className="text-5xl font-bold mb-6">Welcome to MemeGen!</h1>
      <img src="/welcome.png" alt="Welcome" className="max-w-full h-auto" />
    </div>
  );
};

export default Home;
