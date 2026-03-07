import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { IoMdImage } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";

import {
  RichTextEditorComponent,
  Toolbar,
  HtmlEditor,
  Image,
  Link,
  QuickToolbar,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";
import { useState, useRef, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { useForm, Controller } from "react-hook-form";
import { getCategory } from "../../api/category.api";

// ─── Compress image to JPEG before upload ─────────────────────────────────────
// Resizes to max 1024px on the longest side and reduces quality to 0.8
// This keeps file size well under typical server limits (1–2MB)
const compressImage = (file) => {
  return new Promise((resolve) => {
    const MAX_SIZE = 1024;
    const QUALITY = 0.8;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let { width, height } = img;

        // Scale down if either dimension exceeds MAX_SIZE
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            // Return a new File with the same name but compressed
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          QUALITY
        );
      };
    };
  });
};

export default function AddProduct() {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const preview = images.at(-1) || null;

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const { loading, addProduct, addproductImage } = useProducts();

  const allCategory = async () => {
    const res = await getCategory();
    setCategory(res);
  };

  useEffect(() => {
    allCategory();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setImageUploading(true);

    try {
      // FIX 1: compress before upload to avoid 413 Content Too Large
      const compressed = await compressImage(file);
      const res = await addproductImage(compressed);

      // FIX 2: guard against undefined res — only push if upload succeeded
      if (res?.url) {
        setImages((prev) => [...prev, res.url]);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
      // FIX 2: catch block now stops execution — res.url is never accessed
      console.error("Image upload failed:", error);
      setUploadError("Upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }

    e.target.value = "";
  };

  const handleReplace = () => {
    if (images.length > 0) {
      setImages((prev) => prev.slice(0, -1));
    }
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.click();
      }
    }, 0);
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const onSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      description: formData.description,
      detailedDescription: formData.detailedDescription ?? "",
      categoryId: formData.categoryId,
      attributes: ["weight"],
      variants: [
        {
          sku: formData.sku,
          attributes: {
            weight: formData.weight,
          },
          price: Number(formData.price),
          discountPercent: formData.discountPercent
            ? Number(formData.discountPercent)
            : 0,
          stock: Number(formData.stock),
          images: images,
        },
      ],
    };

    await addProduct(payload);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337]">
          Add Product
        </h1>

        <div className="flex gap-6">
          <Button type="button" variant="outline">
            Preview Product
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-300 mx-auto flex gap-4.5 mt-11">
        <div className="w-152.75 shadow-xl bg-white h-fit mb-8 rounded-md">
          {/* Basic Details */}
          <Card title="Basic Details">
            <div className="space-y-6 -mt-2">
              <Input
                label="Product Name"
                placeholder="Enter name"
                {...register("name", {
                  required: "Product Name is Required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <label className="text-[15px] text-[#023337] font-normal">
                Product Description
              </label>
              <textarea
                {...register("description", {
                  required: "Product Description is Required",
                })}
                rows={4}
                className="w-full border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg px-4 py-3 
                  focus:outline-none focus:border-[#00B207] 
                  transition-all duration-200 
                  placeholder:text-gray-400 placeholder:text-sm mt-2.5"
                placeholder="Enter Product Description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <label className="text-[15px] text-[#023337] font-normal">
                Detailed Description
              </label>
              <Controller
                name="detailedDescription"
                control={control}
                rules={{ required: "Detailed Description is Required" }}
                render={({ field }) => (
                  <RichTextEditorComponent
                    value={field.value}
                    change={(e) => field.onChange(e.value)}
                    placeholder="Enter product description here..."
                    height={200}
                    cssClass="custom-rte"
                    fontFamily={{
                      default: "Poppins",
                      items: [
                        { text: "Poppins", value: "Poppins, sans-serif" },
                        { text: "Inter", value: "Inter, sans-serif" },
                        {
                          text: "Arial",
                          value: "Arial, Helvetica, sans-serif",
                        },
                        { text: "Georgia", value: "Georgia, serif" },
                      ],
                    }}
                    toolbarSettings={{
                      items: [
                        "FontName",
                        "FontSize",
                        "|",
                        "Bold",
                        "Italic",
                        "Underline",
                        "|",
                        "Formats",
                        "Alignments",
                        "OrderedList",
                        "UnorderedList",
                        "|",
                        "CreateLink",
                        "Image",
                        "|",
                        "Undo",
                        "Redo",
                      ],
                    }}
                  >
                    <Inject
                      services={[
                        Toolbar,
                        Link,
                        Image,
                        HtmlEditor,
                        QuickToolbar,
                      ]}
                    />
                  </RichTextEditorComponent>
                )}
              />
              {errors.detailedDescription && (
                <p className="text-red-500 text-sm">
                  {errors.detailedDescription.message}
                </p>
              )}
            </div>
          </Card>

          {/* Pricing */}
          <Card title="Pricing">
            <div className="space-y-6">
              <Input
                label="Product Price"
                placeholder="Enter product price"
                className="-mt-4"
                type="number"
                {...register("price", {
                  required: "Product Price is Required",
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}

              <Input
                label="Discounted Price (Optional)"
                placeholder="Enter discounted price"
                className="-mt-3"
                {...register("discountPercent")}
              />
            </div>
          </Card>

          {/* Inventory */}
          <Card title="Inventory">
            <div className="space-y-6">
              <Input
                label="Stock Quantity"
                placeholder="Enter Stock Quantity"
                className="-mt-4"
                type="number"
                {...register("stock", {
                  required: "Stock Quantity is Required",
                })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}

              <Input
                label="Stock Keeping Unit (SKU)"
                placeholder="Enter Stock Keeping Unit"
                className="-mt-3"
                {...register("sku", {
                  required: "SKU is Required",
                })}
              />
              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku.message}</p>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-121.25 bg-white shadow-xl mb-8 rounded-md">
          {/* Product Image */}
          <Card>
            <div className="space-y-4 relative">
              <h2 className="text-[22px] font-medium text-[#023337]">
                Upload Product Image
              </h2>

              <label className="text-[15px] text-[#023337] font-medium">
                Product Image
              </label>

              <div className="border rounded-lg border-[#E5E7EB] h-66.5 flex items-center justify-center text-gray-400 mt-2">
                {imageUploading ? (
                  <span className="text-sm text-gray-400 animate-pulse">
                    Uploading...
                  </span>
                ) : preview === null ? (
                  "Upload Image"
                ) : (
                  <img
                    src={preview}
                    alt="loading preview..."
                    className="w-fit h-66"
                  />
                )}
              </div>

              {/* Upload error message */}
              {uploadError && (
                <p className="text-red-500 text-xs">{uploadError}</p>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <div className="flex justify-between -mt-15.5 px-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={imageUploading}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer disabled:opacity-50"
                >
                  <IoMdImage size={18} />
                  Browse
                </button>

                <button
                  type="button"
                  onClick={handleReplace}
                  disabled={imageUploading}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer disabled:opacity-50"
                >
                  <LuRefreshCw size={16} />
                  Replace
                </button>
              </div>

              <div className="flex flex-wrap w-fit gap-2">
                {images?.map((value, i) => (
                  <div
                    key={i + 1}
                    className="bg-white cursor-pointer w-24.5 h-24.5 border border-[#E5E7EB] rounded-sm justify-center items-center relative flex gap-2 flex-wrap"
                  >
                    <img
                      src={value}
                      alt="image.."
                      className="w-fit h-fit object-cover"
                    />
                    <CiCircleRemove
                      className="absolute top-0.5 right-0.5 size-5 text-[#6A717F] cursor-pointer"
                      onClick={() => handleRemove(i)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  disabled={imageUploading}
                  className="border-2 border-dashed border-[#E5E7EB] rounded-lg h-24.75 w-50.25 flex flex-col items-center justify-center text-green-600 cursor-pointer disabled:opacity-50"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCirclePlus size={18} />
                  Add Image
                </button>
              </div>
            </div>
          </Card>

          <Card title="Categories" className="font-normal">
            <div className="space-y-6 -mt-4">
              <label className="text-[15px] text-[#023337] font-normal">
                Product Categories
              </label>

              <input
                type="hidden"
                {...register("categoryId", {
                  required: "Category is Required",
                })}
              />

              <div className="relative w-full">
                <div
                  className="w-full flex justify-between items-center border rounded-lg px-3 border-[#E5E7EB] bg-[#F9FAFB] h-12 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-[15px] text-[#023337] font-light">
                    {activeCategory === ""
                      ? "Select your categories"
                      : activeCategory.categoryName}
                  </span>
                  <FaCaretDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isOpen && (
                  <div
                    className={`absolute top-full space-y-4 left-0 w-full mt-2 border border-black/20 bg-[#F9FAFB] rounded-md p-5 shadow-lg z-10
                      overflow-hidden transition-all duration-500 ease-in-out
                      ${isOpen ? "opacity-100 max-h-96 translate-y-0" : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"}`}
                  >
                    {category.map((value, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => {
                          setValue("categoryId", value._id, {
                            shouldValidate: true,
                          });
                          setActiveCategory(value);
                          setIsOpen(false);
                        }}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            activeCategory?.categoryName === value.categoryName
                              ? "border-[#00B207]"
                              : "border-gray-300"
                          }`}
                        >
                          {activeCategory?.categoryName ===
                            value.categoryName && (
                            <span className="w-3 h-3 bg-[#00B207] rounded-full" />
                          )}
                        </span>
                        <span className="font-light text-gray-900">
                          {value.categoryName}
                        </span>
                      </li>
                    ))}
                  </div>
                )}
              </div>

              {errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {errors.categoryId.message}
                </p>
              )}

              <Input
                label="Product Weight"
                placeholder="Ex: 750gm"
                {...register("weight", {
                  required: "Product Weight is Required",
                })}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}