import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CreateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: () => void;
}

export default function CreateProfileModal({
  open,
  onOpenChange,
  onCreate,
}: CreateProfileModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] px-4 max-w-md sm:max-w-lg rounded-lg overflow-hidden bg-white ring-1 ring-slate-200 shadow-lg">
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Let's set up your profile</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Welcome! We couldn't find a profile for you. Let's create one so you
            can start exploring.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary text-lg shadow">
                🔒
              </div>
              <div>
                <div className="text-sm font-medium">Secure Identity</div>
                <div className="text-xs text-muted-foreground">Verified access to all platform features.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary text-lg shadow">
                ✨
              </div>
              <div>
                <div className="text-sm font-medium">Personalized Feed</div>
                <div className="text-xs text-muted-foreground">Content tailored to your professional interests.</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <AlertDialogAction
              onClick={onCreate}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-5 py-2 rounded-md shadow"
            >
              Get Started →
            </AlertDialogAction>
            <AlertDialogCancel className="w-full sm:w-auto bg-slate-100 text-slate-700 px-5 py-2 rounded-md">
              Not now
            </AlertDialogCancel>
          </div>

          <p className="text-xs text-muted-foreground mt-4">Takes less than 2 minutes to complete.</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
