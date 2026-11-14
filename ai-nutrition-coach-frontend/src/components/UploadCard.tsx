import { useCallback, useState } from "react";
import { Camera, ImagePlus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { analyzeMeal } from "../services/mealServices";


const UploadCard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setErrorMessage("");

    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    setSelectedFile(file);
    console.log("Selected file:", file);

    // TODO: send file to backend
  }, []);

  const openCamera = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";

    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        const file = target.files[0];

        setErrorMessage("");
        setSelectedFile(file);

        console.log("Captured file:", file);

        // TODO: send file to backend
      }
    };

    input.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDrop,
    onDropRejected: () => {
      setErrorMessage("Invalid file type.");
    },
  });

  const inputProps = getInputProps({
    capture: "environment",
  });

  return (
    <div
      {...getRootProps()}
      className="
        flex
        h-96
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-slate-700
        bg-slate-900
        transition
        hover:border-green-500
        hover:bg-slate-800
      "
    >
      <input {...inputProps} />

       {/* *****************icon**************** */}
      <ImagePlus size={70} className="mb-6 text-green-500" />

       {/* ************drag drop **************** */}
      <h2 className="text-2xl font-semibold">
        {isDragActive ? "Drop your meal here" : "Drag & Drop your meal"}
      </h2>

       {/* ************browse button ********* * */}
      <p className="mt-3 text-gray-400">
        or click to browse
      </p>

       {/* ************Camera****************** */}
      <button type="button"
        onClick={(e) => {
          e.stopPropagation();
          openCamera();
        }}
        className="mt-5 flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
      >
        <Camera size={18} />
        Capture Photo
      </button>

      {/* ****************Media supported******** */}
      <p className="mt-8 text-sm text-gray-500">
        JPG • PNG • WEBP
      </p>

       {/* *************Selected File & Remove File************* */}
      {selectedFile && (
      <div className="mt-4 flex items-center gap-4">
        <p className="text-sm text-green-300">
          {selectedFile.name}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFile(null);
            setErrorMessage("");
          }}
          className="rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
        >
          Remove
        </button>
      </div>
      )}

      {/* **********Next Button********** */}
      <button
        type="button"
        onClick={async (e) => {
          e.stopPropagation();

          if (!selectedFile) return;

          const foods = await analyzeMeal(selectedFile);

          navigate("/review", {
            state: {
              foods,
            },
          });
        }}
        className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Next
      </button>

      {errorMessage && (
        <p className="mt-4 text-sm text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default UploadCard;