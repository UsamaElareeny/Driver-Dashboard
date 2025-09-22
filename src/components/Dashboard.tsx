import { Button } from "@/components/ui/button";
import { Plus, Route, Calendar, Search, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ButtonHTMLAttributes } from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage drivers and routes with beautiful, modern interface
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            className="gradient-primary btn-ripple hover-elevate shadow-primary"
            // onClick={() => EXAMPLE()}
            variant="default"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5"></Plus>
            Add Driver
          </Button>

          <Button
            className="gradient-secondary btn-ripple hover-elevate shadow-secondary"
            // onClick={() => EXAMPLE()}
            variant="secondary"
            size="lg"
          >
            <Route className="mr-2 h-5 w-5"></Route>
            Add Route
          </Button>

          <Button
            // onClick={}
            variant="outline"
            size="lg"
            className="hover-elevate transition-smooth border-primary/20 hover:border-primary/40"
          >
            <Calendar className="mr-2 h-5 w-5"></Calendar>
            Calender View
          </Button>
        </div>
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search drives and routes..."
              className="pl-10 bg-card border-border/50 focus:border-primary/50 transition-smooth"
              //   value={}
              //   onChange={}
            />
          </div>
          <div className="flex gap-2">
            <Button
              // variant={}
              // onClick={}
              className="btn-ripple"
            >
              All
            </Button>
            <Button
              // variant={}
              // onClick={}
              className="btn-ripple"
            >
              Assigned
            </Button>
            <Button
              // variant={}
              // onClick={}
              className="btn-ripple"
            >
              Unassigned
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Routes */}
          <Card className="gradient-card hover-elevate shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Route className="h-6 w-6 text-primary" />
                Routes 14
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-background-secondary border border-border/30 hover:border-primary/30 transition-smooth hover-elevate">
                <div className="flex items-center justify-between mb-3">
                  <h3>Route Name</h3>
                  <Badge variant="default" className="gradient-success">
                    Assigned
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Giza → Cairo</p>
                  <p>Departure: 07:20</p>
                </div>
                {true ? (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-md bg-success/10">
                      <Avatar className="h-8 w-8 avatar-hover">
                        <AvatarImage />
                        <AvatarFallback className="gradient-primary text-primary-foreground text-xs">
                          {"Usama Mohammed"
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium flex-1">
                        Usama Mohammed
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:border-destructive/50 hover:text-destructive btn-ripple"
                        //   onClick={}
                      >
                        Unassign
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:border-primary/50 btn-ripple"
                        //   onClick={}
                      >
                        Reassign
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => {
                    //   setSelectedRouteForAssignment(route);
                    //   setActiveModal("assignment");
                    // }}
                    className="mt-3 w-full btn-ripple hover:border-primary/50"
                  >
                    Assign Driver
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Drivers */}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
