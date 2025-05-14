"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface ProductImagePreviewProps {
  imageUrl?: string;

  onDelete: (e) => void;
}

export default function ProductImagePreview({
  imageUrl,

  onDelete,
}: ProductImagePreviewProps) {
  //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Create a preview URL for the new image if it exists
  //   useEffect(() => {
  //     if (newImage) {
  //       const objectUrl = URL.createObjectURL(newImage);
  //       setPreviewUrl(objectUrl);

  //       // Free memory when this component is unmounted
  //       return () => URL.revokeObjectURL(objectUrl);
  //     } else {
  //       setPreviewUrl(null);
  //     }
  //     return () => {};
  //   }, [newImage]);

  if (imageUrl) {
    return (
      <div className="relative w-full h-40 mt-2 rounded-md overflow-hidden group">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Product preview"
          fill
          className="object-contain"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-80 hover:opacity-100"
          onClick={(e) => {
            onDelete(e);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return null;
}
