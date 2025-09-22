import React, { useState, useRef, useEffect } from "react";
import { X, Check, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onClose: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCropComplete,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropSize] = useState(200); // Fixed circular crop size
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (imageRef.current) {
      drawCanvas();
    }
  }, [imageSrc, cropPosition, imagePosition, imageScale, rotation]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(imageScale, imageScale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      imagePosition.x,
      imagePosition.y,
      image.naturalWidth,
      image.naturalHeight
    );
    ctx.restore();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = cropSize / 2;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const deltaX = e.movementX;
    const deltaY = e.movementY;

    setImagePosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setImageScale((prev) => Math.max(0.1, Math.min(3, prev + delta)));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const cropImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    if (!cropCtx) return;

    cropCanvas.width = cropSize;
    cropCanvas.height = cropSize;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = cropSize / 2;

    cropCtx.beginPath();
    cropCtx.arc(radius, radius, radius, 0, 2 * Math.PI);
    cropCtx.clip();

    const sourceX = centerX - radius;
    const sourceY = centerY - radius;

    cropCtx.drawImage(
      canvas,
      sourceX,
      sourceY,
      cropSize,
      cropSize,
      0,
      0,
      cropSize,
      cropSize
    );

    const croppedDataUrl = cropCanvas.toDataURL("image/png");
    onCropComplete(croppedDataUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] modal-backdrop flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-2xl shadow-elegant modal-content relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Crop Profile Photo</h2>
            <p className="text-muted-foreground">
              Drag to position, scroll to zoom, rotate as needed
            </p>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border border-border/50 rounded-lg cursor-move mx-auto block bg-background/50"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            />
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop source"
              className="hidden"
              onLoad={drawCanvas}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Zoom:</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={imageScale}
                onChange={(e) => setImageScale(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground w-8">
                {Math.round(imageScale * 100)}%
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRotate}
              className="hover:border-primary/50"
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Rotate
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 hover:border-destructive/50 hover:text-destructive"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={cropImage}
              className="flex-1 gradient-success btn-ripple hover-elevate shadow-success"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Crop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
