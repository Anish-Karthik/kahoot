
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const ImageForm = ({
  children,
  imageUrl,
  onImageChange, 
}: {
  children: React.ReactNode;
  imageUrl: string;
  onImageChange: (newImageUrl: string) => void; // Replace "onChange" with a valid prop name
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select A Image</DialogTitle>
          <DialogDescription>Display Image</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <DialogClose asChild key={image}>
              <button
                onClick={() => {
                  console.log("sdfs")
                  onImageChange(image);
                }}
                className={cn(
                  "w-24 h-24 rounded-md bg-gray-100",
                  imageUrl === image && "border-2 border-primary"
                )}
              >
                <img src={image} alt="Avatar" className="w-full h-full" />
              </button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
