import { Button } from "@/components/ui/button";
import { Plus, Route, Calendar } from "lucide-react";
export default function ActionButtons() {
  function EXAMPLE() {}
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        className="gradient-primary btn-ripple hover-elevate shadow-primary"
        onClick={() => EXAMPLE()}
        variant="default"
        size="lg"
      >
        <Plus className="mr-2 h-5 w-5"></Plus>
        Add Driver
      </Button>

      <Button
        className="gradient-secondary btn-ripple hover-elevate shadow-secondary"
        onClick={() => EXAMPLE()}
        variant="secondary"
        size="lg"
      >
        <Route className="mr-2 h-5 w-5"></Route>
        Add Route
      </Button>

      <Button
        onClick={() => EXAMPLE()}
        variant="outline"
        size="lg"
        className="hover-elevate transition-smooth border-primary/20 hover:border-primary/40"
      >
        <Calendar className="mr-2 h-5 w-5"></Calendar>
        Calender View
      </Button>
    </div>
  );
}
