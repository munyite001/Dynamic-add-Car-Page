import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import data from "../unique-makes-and-models.json";
import ImageUploadSection from "@/components/imageUploadSection";

interface Vehicle {
    make: string;
    models: string[];
}

const makesUsedInKenya = [
    "Toyota",
    "Nissan",
    "Honda",
    "Mazda",
    "Mitsubishi",
    "Subaru",
    "Hyundai",
    "Kia",
    "Suzuki",
    "Isuzu",
    "Ford",
    "Volkswagen",
    "Mercedes-Benz",
    "BMW",
    "Peugeot",
    "Daihatsu",
    "Land Rover",
    "Chevrolet"
];

const dataTyped = data as unknown as Vehicle[];
const App: React.FC = () => {
    const vehicleMakes = Array.from(
        dataTyped.map((vehicle) => vehicle.make)
    ).sort();

    const makesInKenya = vehicleMakes.filter((make) =>
        makesUsedInKenya.includes(make)
    );

    console.log(makesInKenya);

    const [selectedMake, setSelectedMake] = useState<string | null>(null);
    const [filteredModels, setFilteredModels] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedMake(selected);
        setFormData({
            ...formData,
            make: selected
        });
        setFilteredModels(() => {
            return dataTyped.filter((vehicle) => vehicle.make === selected)[0].models;

        })
    };

    console.log("Seleced Make: ", selectedMake);

    const [formData, setFormData] = useState<{
        make: string;
        model: string;
        year: string;
        color: string;
        transmission: string;
        engineSize: string;
        horsepower: string;
        fuelType: string;
        features: string[];
        vehicleImages: string[];
        category: string;
        price: string;
        description: string;
    }>({
        make: "",
        model: "",
        year: "",
        color: "",
        transmission: "",
        engineSize: "",
        horsepower: "",
        fuelType: "",
        category: "",
        features: [],
        vehicleImages: [],
        price: "",
        description: ""
    });

    type FormData = {
        make: string;
        model: string;
        year: string;
        color: string;
        transmission: string;
        engineSize: string;
        horsepower: string;
        fuelType: string;
        features: string[];
        price: string;
        description: string;
    };

    const handleValidateForm = (formData: FormData) => {
        const {
            make,
            model,
            year,
            color,
            transmission,
            engineSize,
            horsepower,
            fuelType,
            features,
            price,
            description
        } = formData;
        if (
            make === "" ||
            model === "" ||
            year === "" ||
            color === "" ||
            transmission === "" ||
            engineSize === "" ||
            horsepower === "" ||
            fuelType === "" ||
            features.length === 0 ||
            price === "" ||
            description === ""
        ) {
            alert("Please fill in all required fields");
        } else {
            setShowModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Vehicle Details
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>Make:</strong> {formData.make}
                            </p>
                            <p>
                                <strong>Model:</strong> {formData.model}
                            </p>
                            <p>
                                <strong>Year:</strong> {formData.year}
                            </p>
                            <p>
                                <strong>Color:</strong> {formData.color}
                            </p>
                            <p>
                                <strong>Transmission:</strong>{" "}
                                {formData.transmission}
                            </p>
                            <p>
                                <strong>Engine Size:</strong>{" "}
                                {formData.engineSize}
                            </p>
                            <p>
                                <strong>Horsepower:</strong>{" "}
                                {formData.horsepower}
                            </p>
                            <p>
                                <strong>Fuel Type:</strong> {formData.fuelType}
                            </p>
                            <p>
                                <strong>Features:</strong>{" "}
                                {formData.features.join(", ")}
                            </p>
                            <p>
                                <strong>Price:</strong> {formData.price} KSH
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {formData.description}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    handleValidateForm(formData);
                                    setShowModal(false);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        List Your Vehicle
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our marketplace by listing your vehicle. Please
                        provide accurate details to help renters make informed
                        decisions.
                    </p>
                </div>

                <Card className="bg-white shadow-lg rounded-xl">
                    <CardHeader className="border-b border-gray-100 bg-gray-50 rounded-t-xl">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Vehicle Details
                            </h2>
                            <p className="text-sm text-gray-600">
                                All fields marked with * are required
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                {/* Vehicle Images */}
                                <ImageUploadSection />

                                {/* Basic Information Section */}
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="make"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Make *
                                        </label>
                                        <select
                                            name="make"
                                            id="make"
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            onChange={handleMakeChange}
                                            value={formData.make}
                                        >
                                            <option value="" disabled>
                                                Select Make
                                            </option>
                                            {vehicleMakes.map((make, index) => (
                                                <option
                                                    key={index}
                                                    value={make}
                                                >
                                                    {make}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedMake && (
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="model"
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Model *
                                            </label>
                                            <select
                                                name="model"
                                                id="model"
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                value={formData.model}
                                                onChange={(event) => {
                                                    setFormData({
                                                        ...formData,
                                                        model: event.target
                                                            .value
                                                    });
                                                }}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Select Model
                                                </option>
                                                {filteredModels
                                                    .map((model, index) => (
                                                        <option
                                                            key={index}
                                                            value={model}
                                                        >
                                                            {model}
                                                        </option>
                                                    ))
                                                    .sort()}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {selectedMake && filteredModels.length > 0 && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="year"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Year *
                                                </label>
                                                <select
                                                    name="year"
                                                    id="year"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.year}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            year: event.target
                                                                .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Year
                                                    </option>
                                                {Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2000 + i).map((year, index) => (
                                                    <option key={index} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="color"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Color *
                                                </label>
                                                <select
                                                    name="color"
                                                    id="color"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.color}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            color: event.target
                                                                .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Color
                                                    </option>
                                                    {[
                                                        "Black",
                                                        "White",
                                                        "Silver",
                                                        "Gray",
                                                        "Blue",
                                                        "Red",
                                                        "Brown",
                                                        "Green",
                                                        "Yellow",
                                                        "Gold"
                                                    ].map((color, index) => (
                                                        <option
                                                            key={index}
                                                            value={color}
                                                        >
                                                            {color}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="transmission"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Transmission *
                                                </label>
                                                <select
                                                    name="transmission"
                                                    id="transmission"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={
                                                        formData.transmission
                                                    }
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            transmission:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Transmission
                                                    </option>
                                                    {[
                                                        "Automatic",
                                                        "Manual",
                                                        "CVT"
                                                    ].map(
                                                        (
                                                            transmission,
                                                            index
                                                        ) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    transmission
                                                                }
                                                            >
                                                                {transmission}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        {/* Technical Specifications */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="engineSize"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Engine Size *
                                                </label>
                                                <select
                                                    name="engineSize"
                                                    id="engineSize"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.engineSize}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            engineSize:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Engine Size
                                                    </option>
                                                    {[
                                                        "1000 cc",
                                                        "1200 cc",
                                                        "1500 cc",
                                                        "1800 cc",
                                                        "2000 cc",
                                                        "2500 cc",
                                                        "3000 cc",
                                                        "3500 cc",
                                                        "4000 cc",
                                                        "4500 cc",
                                                        "5000 cc",
                                                        "5500 cc",
                                                        "6000 cc"
                                                    ].map((size, index) => (
                                                        <option
                                                            key={index}
                                                            value={size}
                                                        >
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="horsepower"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Horsepower
                                                </label>
                                                <select
                                                    name="horsepower"
                                                    id="horsepower"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.horsepower}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            horsepower:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Horsepower
                                                    </option>
                                                    {[
                                                        "100-150 HP",
                                                        "150-200 HP",
                                                        "200-250 HP",
                                                        "250-300 HP",
                                                        "300-350 HP",
                                                        "350-400 HP",
                                                        "400-450 HP",
                                                        "450-500 HP",
                                                        "500+ HP"
                                                    ].map((hp, index) => (
                                                        <option
                                                            key={index}
                                                            value={hp}
                                                        >
                                                            {hp}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="fuelType"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Fuel Type *
                                                </label>
                                                <select
                                                    name="fuelType"
                                                    id="fuelType"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.fuelType}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            fuelType:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected
                                                    >
                                                        Select Fuel Type
                                                    </option>
                                                    {[
                                                        "Diesel",
                                                        "Petrol",
                                                        "Electric",
                                                        "Hybrid",
                                                        "CNG",
                                                        "LPG",
                                                        "Hydrogen"
                                                    ].map((fuel, index) => (
                                                        <option
                                                            key={index}
                                                            value={fuel}
                                                        >
                                                            {fuel}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Features Section */}
                                        <div className="space-y-4 mt-8">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                                Vehicle Features
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {[
                                                    "Air Conditioning",
                                                    "Heated Seats",
                                                    "Sunroof",
                                                    "Bluetooth",
                                                    "Backup Camera",
                                                    "Cruise Control",
                                                    "Navigation System",
                                                    "Remote Start",
                                                    "Blind Spot Monitoring",
                                                    "Parking Sensors",
                                                    "Leather Seats",
                                                    "Alloy Wheels",
                                                    "Keyless Entry",
                                                    "Power Windows",
                                                    "Power Steering",
                                                    "Anti-lock Braking System (ABS)",
                                                    "Traction Control",
                                                    "Fog Lights",
                                                    "Tow Package",
                                                    "Roof Rack"
                                                ].map((feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`feature-${index}`}
                                                            name="features"
                                                            value={feature}
                                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                            onChange={() => {
                                                                const selectedFeatures =
                                                                    formData.features.includes(
                                                                        feature
                                                                    )
                                                                        ? formData.features.filter(
                                                                              (
                                                                                  f
                                                                              ) =>
                                                                                  f !==
                                                                                  feature
                                                                          )
                                                                        : [
                                                                              ...formData.features,
                                                                              feature
                                                                          ];
                                                                setFormData({
                                                                    ...formData,
                                                                    features:
                                                                        selectedFeatures
                                                                });
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`feature-${index}`}
                                                            className="text-sm text-gray-700"
                                                        >
                                                            {feature}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Categories section */}
                                        <div className="space-y-4 mt-8">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                                Categories
                                            </h3>
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="category"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Category *
                                                </label>
                                                <select
                                                    name="category"
                                                    id="category"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    value={formData.category}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            category:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                >
                                                    <option value="" disabled>
                                                        Select Category
                                                    </option>
                                                    {[
                                                        "Sport",
                                                        "Heavy Duty",
                                                        "Luxury",
                                                        "Economy",
                                                        "SUV",
                                                        "Truck",
                                                        "Van",
                                                        "Convertible",
                                                        "Coupe",
                                                        "Hatchback",
                                                        "Sedan",
                                                        "Wagon"
                                                    ].map((category, index) => (
                                                        <option
                                                            key={index}
                                                            value={category}
                                                        >
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* Pricing Section */}
                                        <div className="space-y-4 mt-8">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                                Pricing
                                            </h3>
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="price"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Daily Rate (KSH) *
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder="Enter daily rate"
                                                        value={formData.price}
                                                        onChange={(event) => {
                                                            setFormData({
                                                                ...formData,
                                                                price: event
                                                                    .target
                                                                    .value
                                                            });
                                                        }}
                                                    />
                                                    <span className="text-xs text-gray-500 mt-1 block">
                                                        Includes 20% service fee
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Section */}
                                        <div className="space-y-4 mt-8">
                                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                                Description
                                            </h3>
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="description"
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    Vehicle Description *
                                                </label>
                                                <textarea
                                                    name="description"
                                                    id="description"
                                                    rows={4}
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    placeholder="Describe your vehicle's condition, special features, and any other relevant information..."
                                                    value={formData.description}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            description:
                                                                event.target
                                                                    .value
                                                        });
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-8">
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                                onClick={() => {
                                                    handleValidateForm(
                                                        formData
                                                    );
                                                }}
                                            >
                                                List Vehicle
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default App;
