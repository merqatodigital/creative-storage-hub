const MAX_SOURCE_BYTES = 50 * 1024 * 1024;
const MAX_IMAGE_EDGE = 2048;
const TARGET_IMAGE_BYTES = 180 * 1024;

export type ProcessedImage = {
  dataUrl: string;
  width: number;
  height: number;
  originalBytes: number;
  outputBytes: number;
};

const readAsDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.readAsDataURL(blob);
  });

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("This browser could not optimize the image.")),
      "image/webp",
      quality
    );
  });

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("The selected image format is not supported."));
    };
    image.src = url;
  });

function drawImage(image: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Image processing is unavailable.");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

/**
 * Large source images are resized and compressed before entering localStorage.
 * WebP preserves transparency, making this suitable for logos as well.
 */
export async function optimizeImage(file: File): Promise<ProcessedImage> {
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error("Image is larger than 50 MB. Please choose a smaller file.");
  }

  // Keep compact SVG logos sharp and transparent without rasterizing them.
  if (file.type === "image/svg+xml") {
    if (file.size > 1024 * 1024) {
      throw new Error("SVG logo is larger than 1 MB. Please optimize the SVG first.");
    }
    return {
      dataUrl: await readAsDataUrl(file),
      width: 0,
      height: 0,
      originalBytes: file.size,
      outputBytes: file.size,
    };
  }

  const image = await loadImage(file);
  const initialScale = Math.min(
    1,
    MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight)
  );
  let width = Math.max(1, Math.round(image.naturalWidth * initialScale));
  let height = Math.max(1, Math.round(image.naturalHeight * initialScale));
  let quality = 0.86;
  let output = await canvasToBlob(drawImage(image, width, height), quality);

  // Reduce quality first, then dimensions. This keeps uploaded photography
  // crisp while ensuring several site images fit in browser storage.
  for (let attempt = 0; output.size > TARGET_IMAGE_BYTES && attempt < 12; attempt += 1) {
    if (quality > 0.5) {
      quality -= 0.08;
    } else {
      width = Math.max(1, Math.round(width * 0.82));
      height = Math.max(1, Math.round(height * 0.82));
      quality = 0.76;
    }
    output = await canvasToBlob(drawImage(image, width, height), quality);
  }

  return {
    dataUrl: await readAsDataUrl(output),
    width,
    height,
    originalBytes: file.size,
    outputBytes: output.size,
  };
}

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
