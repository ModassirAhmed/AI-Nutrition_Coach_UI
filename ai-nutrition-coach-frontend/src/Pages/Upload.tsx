import UploadCard from "../components/UploadCard";

const Upload = () => {
  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-2 text-4xl font-bold">
        Analyze Your Meal
      </h1>

      <p className="mb-8 text-gray-400">
        Upload a photo and let AI identify the food and estimate nutrition.
      </p>

      <UploadCard />

    </div>
  );
};

export default Upload;
