import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { IoMdImage } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

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

// Empty variant template
const emptyVariant = () => ({
  id: Date.now() + Math.random(),
  sku: "",
  weight: "",
  price: "",
  discountPercent: "",
  stock: "",
  images: [],
  imageUploading: false,
  uploadError: "",
});

export default function AddProduct() {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const preview = images.at(-1) || null;

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // Additional variants state
  const [extraVariants, setExtraVariants] = useState([]);
  const variantFileRefs = useRef({});

  const { loading, addProduct, addproductImage } = useProducts();

  const allCategory = async () => {
    const res = await getCategory();
    setCategory(res);
  };

  useEffect(() => {
    allCategory();
  }, []);

  // ── Original image handlers (UNCHANGED) ──
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setImageUploading(true);

    try {
      const compressed = await compressImage(file);
      const res = await addproductImage(compressed);

      if (res?.url) {
        setImages((prev) => [...prev, res.url]);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
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

  // ── Extra variant handlers ──
  const handleAddVariant = () => {
    setExtraVariants((prev) => [...prev, emptyVariant()]);
  };

  const handleRemoveVariant = (id) => {
    setExtraVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const handleVariantChange = (id, field, value) => {
    setExtraVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleVariantImageUpload = async (id, file) => {
    if (!file) return;
    setExtraVariants((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, imageUploading: true, uploadError: "" } : v
      )
    );
    try {
      const compressed = await compressImage(file);
      const res = await addproductImage(compressed);
      if (res?.url) {
        setExtraVariants((prev) =>
          prev.map((v) =>
            v.id === id
              ? { ...v, images: [...v.images, res.url], imageUploading: false }
              : v
          )
        );
      } else {
        setExtraVariants((prev) =>
          prev.map((v) =>
            v.id === id
              ? { ...v, imageUploading: false, uploadError: "Upload failed." }
              : v
          )
        );
      }
    } catch {
      setExtraVariants((prev) =>
        prev.map((v) =>
          v.id === id
            ? { ...v, imageUploading: false, uploadError: "Upload failed." }
            : v
        )
      );
    }
  };

  const handleVariantImageRemove = (id, imgIndex) => {
    setExtraVariants((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, images: v.images.filter((_, i) => i !== imgIndex) }
          : v
      )
    );
  };

  const handleVariantReplace = (id) => {
    setExtraVariants((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, images: v.images.slice(0, -1) } : v
      )
    );
    setTimeout(() => {
      const ref = variantFileRefs.current[id];
      if (ref) { ref.value = ""; ref.click(); }
    }, 0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm();

  // Watch for live discount preview on primary variant
  const watchedPrice = watch("price");
  const watchedDiscount = watch("discountPercent");
  const discountedAmount =
    watchedPrice && watchedDiscount && Number(watchedDiscount) > 0
      ? (
          Number(watchedPrice) -
          (Number(watchedPrice) * Number(watchedDiscount)) / 100
        ).toFixed(2)
      : null;

  const onSubmit = async (formData) => {
    const primaryVariant = {
      sku: formData.sku,
      attributes: { weight: formData.weight },
      price: Number(formData.price),
      discountPercent: formData.discountPercent
        ? Number(formData.discountPercent)
        : 0,
      stock: Number(formData.stock),
      images: images,
    };

    const additionalVariants = extraVariants.map((v) => ({
      sku: v.sku,
      attributes: { weight: v.weight },
      price: Number(v.price),
      discountPercent: v.discountPercent ? Number(v.discountPercent) : 0,
      stock: Number(v.stock),
      images: v.images,
    }));

    const payload = {
      name: formData.name,
      description: formData.description,
      detailedDescription: formData.detailedDescription ?? "",
      categoryId: formData.categoryId,
      isFeatured:
        formData.isFeatured === "true" || formData.isFeatured === true,
      isHotDeals:
        formData.isHotDeals === "true" || formData.isHotDeals === true,
      hasVariants: true,
      attributes: ["weight"],
      variants: [primaryVariant, ...additionalVariants],
    };

    try {
      await addProduct(payload);
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Product submit failed:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337]">
          Add Product
        </h1>

        <div className="flex gap-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-300 mx-auto flex gap-4.5 mt-11">
        <div className="w-152.75 shadow-xl bg-white h-fit mb-8 rounded-md">
          {/* Basic Details — UNCHANGED */}
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

          {/* Pricing — UNCHANGED fields + discount preview injected below */}
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

              {/* Live discount amount — only shows when both price & discount% entered */}
              {discountedAmount && (
                <div className="flex items-center gap-2 -mt-3">
                  <span className="text-xs text-gray-400 line-through">
                    ₹{Number(watchedPrice).toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-[#00B207]">
                    ₹{discountedAmount}
                  </span>
                  <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {watchedDiscount}% OFF
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Inventory — UNCHANGED */}
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

          {/* ── EXTRA VARIANTS (rendered below Inventory) ── */}
          {extraVariants.map((variant, idx) => {
            const vDiscounted =
              variant.price && variant.discountPercent && Number(variant.discountPercent) > 0
                ? (
                    Number(variant.price) -
                    (Number(variant.price) * Number(variant.discountPercent)) / 100
                  ).toFixed(2)
                : null;
            const vPreview = variant.images.at(-1) || null;

            return (
              <Card key={variant.id} title={`Variant ${idx + 2}`}>
                <div className="space-y-6">
                  {/* Remove button */}
                  <div className="flex justify-end -mt-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(variant.id)}
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      <FaTrash size={11} /> Remove Variant
                    </button>
                  </div>

                  {/* Price */}
                  <Input
                    label="Product Price"
                    placeholder="Enter product price"
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "price", e.target.value)
                    }
                  />

                  {/* Discount */}
                  <div>
                    <Input
                      label="Discounted Price (Optional)"
                      placeholder="Enter discounted price"
                      value={variant.discountPercent}
                      onChange={(e) =>
                        handleVariantChange(
                          variant.id,
                          "discountPercent",
                          e.target.value
                        )
                      }
                    />
                    {/* Live discount amount */}
                    {vDiscounted && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-400 line-through">
                          ₹{Number(variant.price).toFixed(2)}
                        </span>
                        <span className="text-sm font-semibold text-[#00B207]">
                          ₹{vDiscounted}
                        </span>
                        <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          {variant.discountPercent}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock */}
                  <Input
                    label="Stock Quantity"
                    placeholder="Enter Stock Quantity"
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "stock", e.target.value)
                    }
                  />

                  {/* SKU */}
                  <Input
                    label="Stock Keeping Unit (SKU)"
                    placeholder="Enter Stock Keeping Unit"
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "sku", e.target.value)
                    }
                  />

                  {/* Weight */}
                  <Input
                    label="Product Weight"
                    placeholder="Ex: 750gm"
                    value={variant.weight}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "weight", e.target.value)
                    }
                  />

                  {/* Image upload — identical UI to original */}
                  <div className="space-y-4 relative">
                    <label className="text-[15px] text-[#023337] font-medium">
                      Product Image
                    </label>

                    <div className="border rounded-lg border-[#E5E7EB] h-66.5 flex items-center justify-center text-gray-400 mt-2">
                      {variant.imageUploading ? (
                        <span className="text-sm text-gray-400 animate-pulse">
                          Uploading...
                        </span>
                      ) : vPreview === null ? (
                        "Upload Image"
                      ) : (
                        <img
                          src={vPreview}
                          alt="loading preview..."
                          className="w-fit h-66"
                        />
                      )}
                    </div>

                    {variant.uploadError && (
                      <p className="text-red-500 text-xs">{variant.uploadError}</p>
                    )}

                    <input
                      type="file"
                      ref={(el) => (variantFileRefs.current[variant.id] = el)}
                      onChange={(e) => {
                        handleVariantImageUpload(variant.id, e.target.files[0]);
                        e.target.value = "";
                      }}
                      className="hidden"
                      accept="image/*"
                    />

                    <div className="flex justify-between -mt-15.5 px-3">
                      <button
                        type="button"
                        onClick={() =>
                          variantFileRefs.current[variant.id]?.click()
                        }
                        disabled={variant.imageUploading}
                        className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer disabled:opacity-50"
                      >
                        <IoMdImage size={18} />
                        Browse
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVariantReplace(variant.id)}
                        disabled={variant.imageUploading}
                        className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer disabled:opacity-50"
                      >
                        <LuRefreshCw size={16} />
                        Replace
                      </button>
                    </div>

                    <div className="flex flex-wrap w-fit gap-2">
                      {variant.images.map((url, i) => (
                        <div
                          key={i}
                          className="bg-white cursor-pointer w-24.5 h-24.5 border border-[#E5E7EB] rounded-sm justify-center items-center relative flex gap-2 flex-wrap"
                        >
                          <img
                            src={url}
                            alt="image.."
                            className="w-fit h-fit object-cover"
                          />
                          <CiCircleRemove
                            className="absolute top-0.5 right-0.5 size-5 text-[#6A717F] cursor-pointer"
                            onClick={() =>
                              handleVariantImageRemove(variant.id, i)
                            }
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        disabled={variant.imageUploading}
                        className="border-2 border-dashed border-[#E5E7EB] rounded-lg h-24.75 w-50.25 flex flex-col items-center justify-center text-green-600 cursor-pointer disabled:opacity-50"
                        onClick={() =>
                          variantFileRefs.current[variant.id]?.click()
                        }
                      >
                        <FaCirclePlus size={18} />
                        Add Image
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Add Variant Button — sits below Inventory (or last variant) */}
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={handleAddVariant}
              className="w-full border-2 border-dashed border-[#00B207] rounded-xl h-12 flex items-center justify-center gap-2 text-[#00B207] text-[14px] font-medium hover:bg-green-50 transition-colors cursor-pointer"
            >
              <FaCirclePlus size={16} />
              Add Variant
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — COMPLETELY UNCHANGED */}
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

              {/* Is Featured */}
              <div className="flex flex-col gap-[12px]">
                <label className="text-[15px] text-[#023337] font-normal">
                  Featured Products
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#023337] font-light">
                    <input
                      type="radio"
                      value="true"
                      {...register("isFeatured", {
                        required: "Please select a value",
                      })}
                      className="accent-[#00B207] w-4 h-4"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#023337] font-light">
                    <input
                      type="radio"
                      value="false"
                      {...register("isFeatured", {
                        required: "Please select a value",
                      })}
                      className="accent-[#00B207] w-4 h-4"
                    />
                    No
                  </label>
                </div>
                {errors.isFeatured && (
                  <p className="text-red-500 text-sm">
                    {errors.isFeatured.message}
                  </p>
                )}
              </div>

              {/* Is Hot Deals */}
              <div className="flex flex-col gap-[12px]">
                <label className="text-[15px] text-[#023337] font-normal">
                   Hot Deals Products
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#023337] font-light">
                    <input
                      type="radio"
                      value="true"
                      {...register("isHotDeals", {
                        required: "Please select a value",
                      })}
                      className="accent-[#00B207] w-4 h-4"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[15px] text-[#023337] font-light">
                    <input
                      type="radio"
                      value="false"
                      {...register("isHotDeals", {
                        required: "Please select a value",
                      })}
                      className="accent-[#00B207] w-4 h-4"
                    />
                    No
                  </label>
                </div>
                {errors.isHotDeals && (
                  <p className="text-red-500 text-sm">
                    {errors.isHotDeals.message}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}