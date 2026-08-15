"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SearchFormProps {
  placeholder?: string;
  tags?: string[];
  options?: SelectOption[];
  onSearch?: (query: string, type: string) => void; // دي الدالة اللي هتبعت البيانات للصفحة الأب
}

export default function SearchForm({
  // 3. القيم الافتراضية (Fallback)
  placeholder = "City, district, or landmark...",
  tags = ["Coffee Shop", "Boutique", "Restaurant", "Office", "Pharmacy"],
  options = [
    { value: "all", label: "All" },
    { value: "retail", label: "Retail" },
    { value: "office", label: "Office" },
  ],
  onSearch,
}: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, propertyType); 
    } else {
      console.log("Search clicked:", { searchQuery, propertyType }); // شغال كـ Fallback للتجربة
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 mb-16 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Input Field */}
        <div className="flex-1 flex items-center bg-(--bg-inverse)/50 border border-white/10 rounded-xl px-4 py-3">
          <Search color="white" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder} 
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm ps-3"
          />
        </div>

        {/* Select Dropdown */}
        <div className="w-full md:w-48 flex items-center bg-(--bg-inverse)/50 border border-white/10 rounded-xl px-4 py-3 cursor-pointer">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-transparent text-gray-300 focus:outline-none text-sm appearance-none cursor-pointer">
            {/* استخدام الـ Options بشكل ديناميكي */}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#0F172A]">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown color="white" size={22} />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-(--brand-primary) hover:bg-(--brand-primary-hover) text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <Search />
          Search
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchQuery(tag)}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
