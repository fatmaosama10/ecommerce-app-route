import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const CategorySlider = () => {
    const [slidesToShow, setSlidesToShow] = useState(7);

    // تحديث عدد الصور المعروضة بناءً على حجم الشاشة
    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 480) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(7);
            }
        };

        updateSlidesToShow(); // استدعاء عند التحميل
        window.addEventListener("resize", updateSlidesToShow); // تحديث عند تغيير حجم الشاشة

        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, []);

    // دالة جلب البيانات مع التعامل مع الأخطاء
    async function getAllCategory() {
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Error("Failed to fetch categories");
        }
    }

    // استدعاء API باستخدام React Query
    const { data, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategory,
    });

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000
    };

    return (
        <section className="w-[90%] max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <h2 className="mb-8 text-3xl font-medium text-gray-500">Featured Categories</h2>

            {/* عرض رسالة أثناء التحميل */}
            {isLoading && <p className="text-center text-gray-500">Loading categories...</p>}

            {/* عرض رسالة خطأ في حال فشل الجلب */}
            {error && <p className="text-center text-red-500">Failed to load categories</p>}

            {/* عرض السلايدر فقط عند توفر البيانات */}
            {data?.data?.length > 0 && (
                <div className="py-6">
                    <Slider {...settings}>
                        {data?.data?.map((item: any, idx: any) => (
                            <div key={idx}>
                                <img src={item.image} className="w-full h-[200px]" alt={item.name} />
                                <div className="group">
                                    <h3 className="group-hover:text-green-500 mb-4 text-lg text-center text-gray-500 transition-all duration-300">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    );
};

export default CategorySlider;

