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
import { useForm } from "react-hook-form";

// RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const data = [
  "Noodles",
  "Sevai",
  "Ladduuu",
  "Healthy Snacks",
  "Maavuuurandi",
  "oil",
];

export default function AddProduct() {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(imageUrl);
    setImage((prev) => [...prev, imageUrl]);

    e.target.value = "";
  };
  const handleReplace = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemove = (index) => {
    console.log("kkkkk");

    return setImage((prev) => {
      const remove = prev[index];

      if (remove) {
        URL.revokeObjectURL(remove);
      }
      if (preview === remove) {
        setPreview(null);
      }
      return prev?.filter((_, i) => i !== index);
    });
  };

  // console.log(activeCategory);
  const { loading, addProduct } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =(data)=>{
    console.log(data)
  }

  return (
    <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337] ">
          Add Product
        </h1>

        <div className="flex gap-6">
          <Button variant="outline">Preview Product</Button>
          <Button type="submit">Publish Product</Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-300 mx-auto flex gap-4.5 mt-11 ">
        <div className="w-152.75 shadow-xl bg-white h-fit mb-8 rounded-md ">
          {/* basic details */}
          <Card title="Basic Details">
            <div className="space-y-6 -mt-2">
              {/* Product Name */}
              <Input
                label="Product Name"
                placeholder="Enter name"
                {...register("productName", {
                  required: "Product Name is Required",
                })}
              />

              {errors.productName && (
                <p className="text-red-500 text-sm">
                  {errors.productName.message}
                </p>
              )}

              {/* Product Description */}
              <label className="text-[15px] text-[#023337] font-normal">
                Product Description
              </label>
              <textarea
                {...register("productDescription", {
                  required: "Product Description is Required",
                })}
                rows={4}
                className="w-full border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg px-4 py-3 
             focus:outline-none focus:border-[#00B207] 
             transition-all duration-200 
             placeholder:text-gray-400 placeholder:text-sm mt-2.5"
                placeholder="Enter Product Description"
              />

              {errors.productDescription && (
                <p className="text-red-500 text-sm">
                  {errors.productDescription.message}
                </p>
              )}
              {/* Detailed Description */}
              <label className="text-[15px] text-[#023337] font-normal">
                Detailed Description
              </label>
              <RichTextEditorComponent
                placeholder="Enter product description here..."
                className="mt-2.5  placeholder:text-black placeholder:text-sm placeholder:font-light"
                height={200}
                border={12}
                cssClass="custom-rte"
                fontFamily={{
                  default: "Poppins",
                  items: [
                    { text: "Poppins", value: "Poppins, sans-serif" },
                    { text: "Inter", value: "Inter, sans-serif" },
                    { text: "Arial", value: "Arial, Helvetica, sans-serif" },
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
                  services={[Toolbar, Link, Image, HtmlEditor, QuickToolbar]}
                />
              </RichTextEditorComponent>
            </div>
          </Card>
          {/* pricing */}
          <Card title="Pricing">
            <div className="space-y-6">
              <Input label="Product Price" className="-mt-4" type="number" />
              <Input label="Discounted Price (Optional)" className="-mt-3" />
            </div>
          </Card>
          {/* inventory */}
          <Card title="Inventory">
            <div className="space-y-6">
              <Input label="Stock Quantity" className="-mt-4" type="number" />
              <Input label="Stock Keeping Unit (SKU)" className="-mt-3" />
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-121.25 bg-white shadow-xl mb-8 rounded-md">
          {/* Product Image Preview */}
          <Card>
            <div className="space-y-4 relative">
              <h2 className="text-[22px] font-medium text-[#023337]">
                Upload Product Image
              </h2>

              <label className="text-[15px] text-[#023337] font-medium ">
                Product Image
              </label>

              <div className="border rounded-lg border-[#E5E7EB] h-66.5 flex items-center justify-center text-gray-400 mt-2">
                {preview === null ? (
                  "Upload Image "
                ) : (
                  <img
                    src={preview}
                    alt="loading preview..."
                    className="w-fit h-66"
                  />
                )}
              </div>
              {/* buttons */}

              {/* input */}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <div className="flex justify-between -mt-15.5 px-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer"
                >
                  <IoMdImage size={18} />
                  Browse
                </button>

                <button
                  onClick={handleReplace}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer"
                >
                  <LuRefreshCw size={16} />
                  Replace
                </button>
              </div>

              <div className="flex  flex-wrap w-fit gap-2">
                {image?.map((value, i) => (
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
                  className="border-2 border-dashed border-[#E5E7EB] rounded-lg h-24.75 w-50.25 flex flex-col items-center justify-center text-green-600 cursor-pointer"
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

              <div className="relative w-full">
                {/* Trigger */}
                <div
                  className="w-full flex justify-between items-center border rounded-lg px-3 border-[#E5E7EB] bg-[#F9FAFB] h-12 cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-[15px] text-[#023337] font-light">
                    Select your categories
                  </span>
                  <FaCaretDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown */}
                {isOpen && (
                  <div
                    className={`absolute top-full space-y-4 left-0 w-full mt-2 border border-black/20 bg-[#F9FAFB] rounded-md p-5 shadow-lg z-10
                                overflow-hidden transition-all duration-500 ease-in-out
                                ${
                                  isOpen
                                    ? "opacity-100 max-h-96 translate-y-0"
                                    : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"
                                }`}
                  >
                    {data.map((value, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setActiveCategory(value)}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            activeCategory === value
                              ? "border-[#00B207]"
                              : "border-gray-300"
                          }`}
                        >
                          {activeCategory === value && (
                            <span className="w-3 h-3 bg-[#00B207] rounded-full" />
                          )}
                        </span>
                        <span className="font-light text-gray-900">
                          {value}
                        </span>
                      </li>
                    ))}
                  </div>
                )}
              </div>

              <Input label="Product Weight" placeholder="Ex: 750gm" />
              {/* <Input label="Expiration Start" type="date" />
              <Input label="Expiration End" type="date" /> */}
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
