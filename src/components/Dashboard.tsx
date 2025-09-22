import Header from "./Header";
import ActionButtons from "./ActionButtons";

function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />
        <ActionButtons />
      </div>
    </div>
  );
}
export default Dashboard;
