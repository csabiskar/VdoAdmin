import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { BLOG_DATA } from "./blogData.jsx";
import accountCircle from "./images/account_circle.png";
import facebookIcon from "./images/facebook 1.png";
import instagramIcon from "./images/instagram 1.png";
import xIcon from "./images/x_logo.svg.png";
import pinterestIcon from "./images/Social Media.png";
import summerSaleImage from "./images/ChatGPT Image Dec 30 2025 from Product Request (1) 1.png";

const SIDE_IMAGES = [
    "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=900&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&h=1200&fit=crop",
];

export default function UserBlogDetail() {
    const { id } = useParams();

    const blog = useMemo(() => {
        return BLOG_DATA.find((item) => String(item.id) === String(id)) || BLOG_DATA[0];
    }, [id]);

    return (
        <div className="bg-white">
            <div className="mx-auto w-[1280px] max-w-full px-0 pb-[60px] font-['Poppins'] max-[1300px]:px-[20px]">
                <div className="pt-[24px]">
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex h-[163px] w-[842px] max-w-full flex-col justify-between gap-[12px]">
                            <h1 className="text-[32px] font-[500] leading-[44.8px] text-[#1a1a1a] max-[640px]:text-[26px] max-[640px]:leading-[36.4px]">
                                {blog.title}
                            </h1>
                            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-[24px] pt-[8px] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[12px]">
                                <div className="flex items-center gap-[12px]">
                                    <img
                                        src={accountCircle}
                                        alt=""
                                        className="h-[40px] w-[40px]"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-[16px] font-[500] leading-[24px] text-[#1a1a1a]">
                                            {blog.author}
                                        </p>
                                        <p className="text-[14px] leading-[21px] text-[#808080]">
                                            04 April, 2024 • {blog.readTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-[5px]">
                                    {[
                                        { src: facebookIcon, alt: "Facebook", className: "h-[18px] w-[18px]" },
                                        { src: xIcon, alt: "X", className: "h-[18px] w-[18px]" },
                                        { src: pinterestIcon, alt: "Pinterest", className: "h-auto w-auto" },
                                        { src: instagramIcon, alt: "Instagram", className: "h-[18px] w-[18px]" },
                                    ].map((icon) => (
                                        <span
                                            key={icon.alt}
                                            className="flex h-[40px] w-[40px] items-center justify-center"
                                        >
                                            <img
                                                src={icon.src}
                                                alt={icon.alt}
                                                className={`${icon.className} object-contain`}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[558px] w-[842px] max-w-full overflow-hidden rounded-[8px] max-[640px]:h-[360px]">
                            <img
                                alt=""
                                src={blog.image}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-[minmax(0,871px)_minmax(0,408px)] gap-[30px] pt-[60px] max-[1100px]:grid-cols-1">
                            <div className="flex flex-col gap-[24px] text-[18px] font-[400] leading-[27px] text-[#808080]">
                                <p>
                                    Millets are a group of small-seeded grasses that have been cultivated for thousands of years. They are known for their resilience, adaptability, and nutritional value. In recent years, millets have gained popularity as a superfood due to their numerous health benefits and potential to address malnutrition and hidden hunger in developing countries.
                                </p>
                                <p>
                                    Millets were among the first crops to be domesticated in India with several pieces of evidence pointing to their consumption during the Indus valley civilization. Millets are produced in most of the states characterized by low to moderate precipitation (200–800 mm rainfall).
                                </p>
                                <p>
                                    Millets are the stapled crops adapted to dry land agro-ecologies of the arid and semi-arid tropics. Millets are an important nutricereal crop being drought-resistant, climate-resilient, and pest and disease-resistant grown in 4 months unlike rice and wheat, which are grown for 6 months.
                                </p>
                                <p>
                                    Millets are a rich source of protein, fiber, vitamins, and minerals. They are gluten-free and have a low glycemic index, making them an ideal food choice for people with celiac disease or diabetes. Research has shown that millets may help prevent chronic diseases such as heart disease, diabetes, and cancer. They are also known to support gut health and bone health.
                                </p>
                                <ul className="list-disc pl-[24px] mt-[60px]">
                                    <li>
                                        Millets have served as a traditional staple for hundreds of millions of people in Sub-Saharan Africa and Asia (particularly in India, China, and Nigeria) for 7000 years and are now cultivated across the world. Estimates show that more than 90 million people in Africa and Asia depend on millets in their diets.
                                    </li>
                                    <li>
                                        Millets are also deeply rooted in Indigenous Peoples' culture and traditions. They have influenced contemporary food habits and continue to be an essential part of many traditional recipes and culinary practices.
                                    </li>
                                    <li>
                                        India is the largest producer of millets in the world, accounting for over 40% of the global production.
                                    </li>
                                    <li>
                                        Other major millet-producing countries include Nigeria, Niger, China, Mali, Burkina Faso, Sudan, and Ethiopia.
                                    </li>
                                    <li>
                                        India's major millet exporting countries are U.A.E, Nepal, Saudi Arabia, Libya, Oman, Egypt, Tunisia, Yemen, U.K, and U.S.A.
                                    </li>
                                    <li>
                                        The varieties of millets exported by India include Bajra, Ragi, Canary, Jawar, and Buckwheat.
                                    </li>
                                </ul>
                            </div>

                            <aside className="flex flex-col gap-[208px] max-[1100px]:order-first">
                                {SIDE_IMAGES.map((src, index) => (
                                    <div
                                        key={src}
                                        className={`relative h-[356px] w-[408px] overflow-hidden rounded-[10px] max-w-full max-[1100px]:h-[260px] max-[1100px]:w-full ${
                                            index === 1 ? "mt-[71px]" : ""
                                        }`}
                                    >
                                        <img
                                            alt={index === 0 ? "Millet bowl" : "Millet grains"}
                                            src={src}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </aside>
                        </div>
                    </div>

                    <div className="relative mt-[183px] h-[420px] w-[1280px] max-w-full overflow-hidden rounded-[10px] bg-[#f8f4ec]">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-0 top-0 h-full w-[calc(716px-54.175px)] bg-[repeating-linear-gradient(0deg,#fff_0_2px,transparent_2px_54.175px),repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_54.175px)] rounded-r-[10px]"
                        />
                        <div className="relative grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-stretch gap-[24px] px-[80px] max-[900px]:grid-cols-1 max-[900px]:px-[24px]">
                            <div className="flex flex-col justify-center gap-[16px]">
                                <div className="flex flex-col gap-[12px]">
                                    <p className="text-[16px] font-[500] uppercase tracking-[0.32px] text-[#1a1a1a]">Summer Sale</p>
                                    <p className="text-[56px] font-[600] leading-[1.2] text-[#1a1a1a] max-[640px]:text-[40px]">
                                        <span className="text-[#ff8a00]">30%</span> OFF
                                    </p>
                                </div>
                                <p className="text-[16px] leading-[1.5] text-[#1a1a1a]/70">Free Shipping | We deliver, you enjoy!</p>
                                <button className="inline-flex w-fit items-center gap-[16px] rounded-[5px] bg-[#00b207] px-[40px] py-[16px] text-[16px] font-[600] text-white">
                                    Shop Now
                                    <span className="text-[18px]">→</span>
                                </button>
                            </div>
                            <div className="relative h-full w-[716px] max-w-full overflow-hidden rounded-[10px] bg-transparent">
                                <img
                                    alt="Featured products"
                                    src={summerSaleImage}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
