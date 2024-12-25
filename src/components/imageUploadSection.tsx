import { useState } from "react";
import { X, Upload } from "lucide-react";

interface Image {
    url: string;
    file: File;
}

const ImageUploadSection = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    console.log(images);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
        if (files.length + images.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file: file
        }));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Vehicle Images *
            </h3>
            <div className="space-y-3 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 font-medium">
                    Kindly upload a minimum of 5 clear images capturing:
                </p>
                <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>Front view of the vehicle including License Plate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>Back view of the vehicle</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>Side view of the vehicle</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>Interior front view of the vehicle including the dashboard</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>Interior Back View of the vehicle</span>
                    </li>
                </ul>
            </div>
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-all
          ${
              isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
          }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="vehicleImages"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleFiles(Array.from(e.target.files));
                        }
                    }}
                />

                <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">
                            Drag and drop images here or click to browse
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Upload up to 5 high-quality images (PNG, JPG)
                        </p>
                    </div>
                </div>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.url}
                                alt={`Vehicle preview ${index + 1}`}
                                className="h-32 w-full object-cover rounded-lg"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploadSection;
