import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ErrorMessage() {
  return (
    <Alert className="mt-8">
      <div className="flex items-center gap-4">
        <TriangleAlert className="h-8 w-8 stroke-rose-600" />
        <div className="flex flex-col items-center">
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Please try again later</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
