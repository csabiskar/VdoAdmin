import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BLOG_DATA } from "./blogData.jsx";

const TOTAL_BLOGS = BLOG_DATA.length;
const ITEMS_PER_PAGE = 9;
const TOTAL_PAGES = Math.ceil(TOTAL_BLOGS / ITEMS_PER_PAGE);

// ── SVG: User icon (matching Figma) ──
function UserIcon() {
    return (
        <svg
            width="19.394"
            height="19.394"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.69717 8.88848C11.4823 8.88848 12.9295 7.44131 12.9295 5.65615C12.9295 3.871 11.4823 2.42383 9.69717 2.42383C7.91202 2.42383 6.46484 3.871 6.46484 5.65615C6.46484 7.44131 7.91202 8.88848 9.69717 8.88848Z"
                stroke="#B3B3B3"
                strokeWidth="1.16364"
            />
            <path
                d="M12.1212 11.3127H7.27268C5.04876 11.3127 3.04237 13.3734 4.51066 15.0534C5.55616 16.2495 7.27268 17.5762 9.69717 17.5762C12.1217 17.5762 13.8382 16.2495 14.8837 15.0534C16.352 13.3734 14.3456 11.3127 12.1212 11.3127Z"
                stroke="#B3B3B3"
                strokeWidth="1.16364"
            />
        </svg>
    );
}

// ── SVG: Arrow right ──
function ArrowRight({ className }) {
    return (
        <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M15.2727 7H0.727273" stroke="#00B307" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" />
            <path d="M9.09091 1L15.2727 7L9.09091 13" stroke="#00B307" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" />
        </svg>
    );
}

// ── SVG: Chevron left (mirrored Figma chevron) ──
function ChevronLeft({ color = "#B3B3B3", className }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M12.9167 15.8334L7.08337 10.0001L12.9167 4.16675" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
    );
}

// ── SVG: Chevron right (exact Figma) ──
function ChevronRight({ color = "#1A1A1A", className }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M7.08331 4.16658L12.9166 9.99992L7.08331 15.8333" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
    );
}

// ── Blog Card ──
function BlogCard({ blog, onOpen }) {
    return (
        <div
            className="flex w-[411px] cursor-pointer flex-col overflow-hidden rounded-[8px] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-[1300px]:w-full"
            onClick={onOpen}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen();
                }
            }}
            role="button"
            tabIndex={0}
        >
            <div className="relative h-[314px] w-full overflow-hidden rounded-t-[8px]">
                <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute bottom-[23.2px] left-[23.2px] inline-flex h-[56.242px] w-[56.242px] flex-col items-center justify-center gap-[0.09px] rounded-[3.879px] bg-white pt-[5.818px] pr-[14.698px] pb-[9.334px] pl-[14.545px] box-border font-['Poppins']">
                    <span className="text-[19.394px] font-[500] leading-[1.5] text-[#1a1a1a]">{blog.day}</span>
                    <span className="text-[11.636px] font-[500] uppercase leading-[1] tracking-[0.3491px] text-[#808080]">{blog.month}</span>
                </div>
            </div>
            <div className="flex h-[170px] flex-col items-start rounded-b-[8px] border-[0.97px] border-[#e6e6e6] border-t-0 bg-white p-[23.273px] pb-[28.576px] box-border">
                <div className="mb-[7.758px] flex items-center gap-[4px]">
                    <span className="flex h-[19.394px] w-[19.394px] shrink-0 items-center justify-center">
                        <UserIcon />
                    </span>
                    <span className="whitespace-nowrap text-[13.576px] leading-[1.5] text-[#666]">
                        &nbsp;By {blog.author}&nbsp;&nbsp;|&nbsp;&nbsp;{blog.readTime}
                    </span>
                </div>
                <h3 className="m-0 w-[364.606px] max-w-full overflow-hidden text-[17.455px] font-[500] leading-[1.5] text-[#1a1a1a] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {blog.title}
                </h3>
                <button
                    className="group mt-auto inline-flex items-center gap-[11.636px] rounded-[41.697px] border-0 bg-transparent p-0 font-['Poppins'] text-[15.515px] font-[600] text-[#00b207] no-underline hover:text-[#009906] cursor-pointer"
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onOpen();
                    }}
                >
                    Read More
                    <ArrowRight className="h-[11.684px] w-[14.546px] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}

// ── Pagination ──
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = useMemo(() => {
        const items = [];
        const maxStaticPages = 5;
        if (totalPages <= maxStaticPages) {
            for (let i = 1; i <= maxStaticPages; i++) items.push(i);
            return items;
        }
        // Always show: 1, 2, 3, 4, 5 ... last
        if (currentPage <= 4) {
            items.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
            items.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            items.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
        return items;
    }, [currentPage, totalPages]);

    return (
        <div className="mt-[148px] flex items-center justify-center gap-[12px]">
            <button
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[500px] bg-[#f2f2f2] p-[8px] transition-colors duration-150 hover:bg-[#e6e6e6] disabled:cursor-not-allowed disabled:bg-[#f2f2f2] disabled:opacity-100"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Previous page"
            >
                <ChevronLeft color={currentPage === 1 ? "#B3B3B3" : "#1A1A1A"} className="h-[20px] w-[20px]" />
            </button>

            <div className="flex items-center gap-0">
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <span key={`ellipsis-${idx}`} className="flex h-[36px] w-[36px] items-center justify-center font-['Poppins'] text-[16px] text-[#666]">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`flex h-[36px] w-[36px] items-center justify-center rounded-[130px] border-0 p-[8px] font-['Poppins'] text-[16px] leading-[1.5] transition-all duration-150 ${
                                page === currentPage
                                    ? "bg-[#00b207] font-[500] text-white"
                                    : "bg-white font-[400] text-[#666] hover:bg-[#f2f2f2]"
                            } disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white`}
                            onClick={() => onPageChange(page)}
                            disabled={page > totalPages}
                            aria-disabled={page > totalPages}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                className="flex h-[36px] w-[36px] items-center justify-center rounded-[500px] border border-[#e6e6e6] bg-white p-[8px] transition-colors duration-150 hover:bg-[#e6e6e6] disabled:cursor-not-allowed disabled:border-0 disabled:bg-[#f2f2f2] disabled:opacity-100"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Next page"
            >
                <ChevronRight color={currentPage === totalPages ? "#B3B3B3" : "#1A1A1A"} className="h-[20px] w-[20px]" />
            </button>
        </div>
    );
}

// ── Main Component ──
export default function UserBlogListing() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("latest");
    const navigate = useNavigate();

    const paginatedBlogs = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return BLOG_DATA.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page < 1 || page > TOTAL_PAGES) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mx-auto w-[1280px] max-w-full px-0 pb-[60px] font-['Poppins'] max-[1300px]:px-[20px]">
            {/* Sort Bar */}
            <div className="flex h-[39.394px] items-center justify-between mb-[32px] mt-0 pt-0 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[12px]">
                <div className="flex items-center gap-[7.758px]">
                    <label className="whitespace-nowrap text-[13.576px] leading-[1.5] text-[#808080]" htmlFor="blog-sort">
                        Sort by:
                    </label>
                    <select
                        id="blog-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="box-border h-[39.394px] min-w-[130px] appearance-none rounded-[3.879px] border-[0.97px] border-[#e6e6e6] bg-[url('data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%234D4D4D' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E')] bg-no-repeat bg-[right_15.515px_center] py-[9.697px] pr-[36px] pl-[15.515px] font-['Poppins'] text-[13.576px] leading-[1.5] text-[#4d4d4d] outline-none focus:border-[#00b207]"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
                    </select>
                </div>
                <p className="text-[15.515px] leading-[1.5] text-[#1a1a1a]">
                    <strong>{TOTAL_BLOGS}</strong> <span className="text-[#666]">Results Found</span>
                </p>
            </div>

            {/* Blog Cards Grid */}
            <div className="flex flex-wrap gap-x-[10px] gap-y-[24px] max-[1300px]:grid max-[1300px]:[grid-template-columns:repeat(auto-fill,minmax(380px,1fr))] max-[1300px]:gap-[24px] max-[640px]:grid-cols-1">
                {paginatedBlogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onOpen={() => navigate(`/user-blogs/${blog.id}`)}
                    />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
