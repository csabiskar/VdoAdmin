import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  createBlog,
  getBlogById,
  updateBlog,
  uploadBlogImage,
} from "../../api/blog.api";

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarBtn({ children, onClick, active, title }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      title={title}
      className={`px-2 py-1 rounded text-sm transition select-none ${
        active ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Rich Text Editor ─────────────────────────────────────────────────────────
function RichTextEditor({ onChange, initialValue }) {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({});
  const isInitialized = useRef(false);

  useEffect(() => {
    if (editorRef.current && initialValue && !isInitialized.current) {
      editorRef.current.innerHTML = initialValue;
      isInitialized.current = true;
    }
  }, [initialValue]);

  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  }, []);

  const execCmd = useCallback(
    (cmd, value = null) => {
      editorRef.current?.focus();
      document.execCommand(cmd, false, value);
      onChange(editorRef.current?.innerHTML || "");
      updateActiveFormats();
    },
    [onChange, updateActiveFormats]
  );

  const handleFontSize = (e) => {
    const size = e.target.value;
    if (!size) return;
    editorRef.current?.focus();
    document.execCommand("fontSize", false, "7");
    const fontElements = editorRef.current?.querySelectorAll('font[size="7"]');
    fontElements?.forEach((el) => {
      const span = document.createElement("span");
      span.style.fontSize = size;
      span.innerHTML = el.innerHTML;
      el.parentNode.replaceChild(span, el);
    });
    onChange(editorRef.current?.innerHTML || "");
  };

  const handleHeading = (e) => {
    const val = e.target.value;
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, val === "p" ? "p" : val);
    onChange(editorRef.current?.innerHTML || "");
  };

  const handleTextColor = (e) => {
    execCmd("foreColor", e.target.value);
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
    updateActiveFormats();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-300 focus-within:border-green-400 transition">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50">
        {/* Heading */}
        <select
          onMouseDown={(e) => e.stopPropagation()}
          onChange={handleHeading}
          defaultValue="p"
          className="text-sm border border-gray-200 rounded px-1 py-0.5 bg-white cursor-pointer"
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="blockquote">Quote</option>
        </select>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Font Size */}
        <select
          onMouseDown={(e) => e.stopPropagation()}
          onChange={handleFontSize}
          defaultValue=""
          className="text-sm border border-gray-200 rounded px-1 py-0.5 bg-white w-16 cursor-pointer"
        >
          <option value="" disabled>Size</option>
          <option value="10px">10</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="28px">28</option>
          <option value="32px">32</option>
          <option value="36px">36</option>
          <option value="48px">48</option>
        </select>

        {/* Text Color */}
        <label
          title="Text color"
          className="relative w-7 h-7 rounded overflow-hidden border border-gray-300 cursor-pointer flex items-center justify-center"
          onMouseDown={(e) => e.preventDefault()}
        >
          <span className="text-sm font-bold leading-none">A</span>
          <input
            type="color"
            defaultValue="#000000"
            onChange={handleTextColor}
            className="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0"
          />
        </label>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Bold */}
        <ToolbarBtn title="Bold" active={activeFormats.bold} onClick={() => execCmd("bold")}>
          <span className="font-bold">B</span>
        </ToolbarBtn>

        {/* Italic */}
        <ToolbarBtn title="Italic" active={activeFormats.italic} onClick={() => execCmd("italic")}>
          <span className="italic">I</span>
        </ToolbarBtn>

        {/* Underline */}
        <ToolbarBtn title="Underline" active={activeFormats.underline} onClick={() => execCmd("underline")}>
          <span className="underline">U</span>
        </ToolbarBtn>

        {/* Strikethrough */}
        <ToolbarBtn title="Strikethrough" active={activeFormats.strikeThrough} onClick={() => execCmd("strikeThrough")}>
          <span className="line-through">S</span>
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Align Left */}
        <ToolbarBtn title="Align left" onClick={() => execCmd("justifyLeft")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h12M3 18h15" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        {/* Align Center */}
        <ToolbarBtn title="Align center" onClick={() => execCmd("justifyCenter")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M6 12h12M4 18h16" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        {/* Align Right */}
        <ToolbarBtn title="Align right" onClick={() => execCmd("justifyRight")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M9 12h12M6 18h15" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Unordered List */}
        <ToolbarBtn title="Bullet list" active={activeFormats.insertUnorderedList} onClick={() => execCmd("insertUnorderedList")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        {/* Ordered List */}
        <ToolbarBtn title="Numbered list" active={activeFormats.insertOrderedList} onClick={() => execCmd("insertOrderedList")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M10 6h11M10 12h11M10 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Indent */}
        <ToolbarBtn title="Indent" onClick={() => execCmd("indent")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M9 12h12M9 18h12M3 12l4 3-4 3V12z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ToolbarBtn>

        {/* Outdent */}
        <ToolbarBtn title="Outdent" onClick={() => execCmd("outdent")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M9 12h12M9 18h12M7 15l-4-3 4-3v6z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {/* Link */}
        <ToolbarBtn
          title="Insert link"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCmd("createLink", url);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        {/* Unlink */}
        <ToolbarBtn title="Remove link" onClick={() => execCmd("unlink")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18.364 5.636a3 3 0 010 4.243L15.5 12.74M5.636 18.364a3 3 0 010-4.243L8.5 11.26M3 3l18 18" strokeLinecap="round" />
          </svg>
        </ToolbarBtn>

        {/* Clear Formatting */}
        <ToolbarBtn title="Clear formatting" onClick={() => execCmd("removeFormat")}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M6 18L17.94 6M4 6h12l-1.68 4M9.06 14H20" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ToolbarBtn>
      </div>

      {/* ── Editable Content Area ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        data-placeholder="Enter Blog Description"
        className="min-h-45 max-h-100 overflow-y-auto p-3 text-sm text-gray-700 focus:outline-none"
        style={{ lineHeight: "1.6" }}
      />

      <style>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

// ─── Image Upload Box ─────────────────────────────────────────────────────────
function ImageUploadBox({ label, height = "h-36", onUpload, imageUrl, onReplace }) {
  const inputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onUpload(reader.result, file);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      {label && <p className="text-sm text-gray-600 mb-2">{label}</p>}
      <div className={`relative bg-gray-200 rounded-lg ${height} flex items-center justify-center overflow-hidden`}>
        {imageUrl ? (
          <img src={imageUrl} alt="uploaded" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1 bg-white border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Browse
          </button>
          {imageUrl && onReplace && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 bg-white border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.93-4.36M20 15a9 9 0 01-14.93 4.36" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Replace
            </button>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Additional Images ────────────────────────────────────────────────────────
function AdditionalImages({ images, onAdd, onRemove, additionalFiles }) {
  const inputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onAdd(reader.result, file);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {images.map((img, i) => (
        <div key={i} className="relative w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="absolute top-0.5 right-0.5 bg-white rounded-full w-4 h-4 flex items-center justify-center shadow text-gray-500 hover:text-red-500 transition"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}

      {images.length < 2 && (
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

{console.log(additionalFiles.length, "kkk")}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={additionalFiles.length >= 1}
        className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-green-400 transition group"
      >
        <span className="w-6 h-6 bg-[#00B207] rounded-full flex items-center justify-center text-white group-hover:bg-green-700 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[10px] text-gray-500 mt-1">Add Image</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function CreateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [title, setTitle]                     = useState("");
  const [description, setDescription]         = useState("");
  const [author, setAuthor]                   = useState("");
  const [readingTime, setReadingTime]         = useState("");
  const [thumbnailImg, setThumbnailImg]       = useState(null);
  const [blogImg, setBlogImg]                 = useState(null);
  const [additionalImgs, setAdditionalImgs]   = useState([]);
  const [category, setCategory]               = useState("");
  const [loaded, setLoaded]                   = useState(false);

  const [thumbnailFile, setThumbnailFile]     = useState(null);
  const [blogImgFile, setBlogImgFile]         = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  // ── Load blog for edit mode ──────────────────────────────────────────────
  useEffect(() => {
    if (!isEditMode) { setLoaded(true); return; }

    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);

        // ✅ FIX: API response is { blog: { ...blogData } } — unwrap it
        const blog = res?.blog ?? res;

        setTitle(blog.title || "");
        setDescription(blog.description || "");
        setAuthor(blog.author || "");
        setReadingTime(blog.readingTime || "");
        setCategory(blog.category || "");

        // ✅ FIX: images is a flat array — map positionally
        const imgs = blog.images || [];
        setThumbnailImg(imgs[0] || null);
        setBlogImg(imgs[1] || null);
        setAdditionalImgs(imgs.slice(2));

      } catch (err) {
        console.error("Failed to load blog:", err);
        alert("Failed to load blog for editing.");
      } finally {
        setLoaded(true);
      }
    };

    fetchBlog();
  }, [id, isEditMode]);

  // ── Image handlers ───────────────────────────────────────────────────────
  const handleThumbnailUpload = (dataUrl, file) => {
    setThumbnailImg(dataUrl);
    setThumbnailFile(file);
  };

  const handleBlogImgUpload = (dataUrl, file) => {
    setBlogImg(dataUrl);
    setBlogImgFile(file);
  };

  const handleAdditionalAdd = (dataUrl, file) => {
    setAdditionalImgs((prev) => [...prev, dataUrl]);
    setAdditionalFiles((prev) => [...prev, file]);
  };

  const handleAdditionalRemove = (i) => {
    setAdditionalImgs((prev) => prev.filter((_, idx) => idx !== i));
    setAdditionalFiles((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ── Upload a file only if a new one was selected ─────────────────────────
  const uploadIfNeeded = async (file, existingUrl) => {
    if (!file) return existingUrl ?? null;
    const res = await uploadBlogImage(file);
    return res.url ?? res.imageUrl ?? res.data?.url ?? null;
  };

  // ── Publish / Update ─────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!title.trim()) { alert("Please enter a blog title."); return; }
    if (!author.trim()) { alert("Please enter an author name."); return; }

    try {
      const [resolvedThumbnail, resolvedBlogImg, ...resolvedAdditional] =
        await Promise.all([
          uploadIfNeeded(thumbnailFile, thumbnailImg),
          uploadIfNeeded(blogImgFile, blogImg),
          ...additionalFiles.map((file, i) =>
            uploadIfNeeded(file, additionalImgs[i])
          ),
        ]);

      const payload = {
        title:       title.trim(),
        description,
        author:      author.trim(),
        readingTime: readingTime.trim() || "N/A",
        images:      [resolvedThumbnail, resolvedBlogImg, ...resolvedAdditional],
        category,
      };

      if (isEditMode) {
        await updateBlog(id, payload);
      } else {
        await createBlog({
          ...payload,
          status:      "Published",
          publishedOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
          }),
        });
      }

      navigate("/blogs");
    } catch (err) {
      console.error("Publish failed:", err);
      alert("Failed to save blog. Please try again.");
    }
  };


  if (!loaded) return null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337]">
          {isEditMode ? "Edit Blog" : "Create New Blog"}
        </h1>
        <Button onClick={handlePublish}>
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* ── Left ── */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Blog Details</h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">Blog Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">Blog Description</label>
            <RichTextEditor onChange={setDescription} initialValue={description} />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">Author</label>
            <input
              type="text"
              placeholder="Enter Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Reading time</label>
            <input
              type="text"
              placeholder="Enter reading time. ex: 5min"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition"
            />
          </div>
        </div>

        {/* ── Right ── */}
        <div className="w-80 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Upload Blogs Image</h2>

          <ImageUploadBox
            label="Add Thumbnail Image (ex: Shown in blog listing)"
            height="h-36"
            imageUrl={thumbnailImg}
            onUpload={handleThumbnailUpload}
          />

          <ImageUploadBox
            label="Blog Image (ex: Shown inside blog)"
            height="h-36"
            imageUrl={blogImg}
            onUpload={handleBlogImgUpload}
            onReplace={() => { setBlogImg(null); setBlogImgFile(null); }}
          />

          <AdditionalImages
            images={additionalImgs}
            onAdd={handleAdditionalAdd}
            onRemove={handleAdditionalRemove}
            additionalFiles={additionalFiles}

          />

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Product Categories</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition bg-white"
              >
                <option value="">Select your Category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="health">Health</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;