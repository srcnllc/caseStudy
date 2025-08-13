  "use client";

  import Header from "@/components/Header/Header";
  import HourlyChart from "@/tools/HourlyChart/HourlyChart";
  import { useEffect, useState } from "react";
  import Hourly from '@/mocks/hourly'
  import { useForm } from "react-hook-form";
  import toast, { Toaster } from "react-hot-toast";
  import Tuketim from "@/tools/Tuketim/Tuketim";

  const translations = {
    tr: {
      unitPrice: "Birim fiyat (TL/kWh)",
      fixedFee: "Sabit ücret (TL/ay)",
      alarmThreshold: "Alarm eşiği (kWh/gün)",
      save: "Kaydet",
      success: "Kayıt başarıyla tamamlandı!",
      finalReading:"Son Okuma",
      todayTotal:"Bugün Toplam",
      monthlyEstimatedBill:"Aylık Tahmini Fatura",
      consumption:"Tüketim",
      settings:"Ayarlar"


    },
    en: {
      unitPrice: "Unit Price (TL/kWh)",
      fixedFee: "Fixed Fee (TL/month)",
      alarmThreshold: "Alarm Threshold (kWh/day)",
      save: "Save",
      success: "Saved successfully!",
      finalReading:"Final Reading",
      todayTotal:"Today Total",
      monthlyEstimatedBill:"Monthly Estimated Bill",
      consumption:"Consumption",
      settings:"Settings"

    }
  };
  export default function Home() {
      const [activeTab, setActiveTab] = useState("tuketim");
    const [darkMode, setDarkMode] = useState(false);

        const [lang, setLang] = useState("tr");
    const t = translations[lang];

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

    useEffect(() => {
      const saved = localStorage.getItem("settings");
      if (saved) reset(JSON.parse(saved));
    }, [reset]);

    const onSubmit = (data) => {
      localStorage.setItem("settings", JSON.stringify(data));
      toast.success(t.success);
    };
    const dailyTotal = Hourly.reduce((sum, item) => sum + parseFloat(item.kwh), 0);
  const savedSettings = JSON.parse(localStorage.getItem("settings")) || { unitPrice: 0, fixedFee: 0 };

    return (
          <div className="h-screen flex flex-col ">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setDarkMode={setDarkMode} 
          darkMode={darkMode}
          lang={lang}
          setLang={setLang}
          t={t}
      />
        <main 
        className={
          `p-8 flex-1 overflow-auto 
         ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }
        `}>
          {activeTab === "tuketim" && 
            <div className="flex gap-2 justify-center items-center h-full flex-col md:flex-row">
              <Tuketim dailyTotal={dailyTotal} savedSettings={savedSettings} darkMode={darkMode} t={t}/>
              <div className="w-full md:w-1/2">
                <HourlyChart data={Hourly} />
              </div>
            </div>
            }
          {activeTab === "ayarlar" && <div className="flex justify-center h-full items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/2">
          <div>
            <label className="block mb-1 font-medium">{t.unitPrice}</label>
            <input
              type="number"
              step="0.01"
              {...register("unitPrice", { required: true, min: 0.01 })}
              className="w-full p-2 border rounded"
            />
            {errors.unitPrice?.type === "required" && <p className="text-red-500 text-sm mt-1">Zorunlu alan</p>}
            {errors.unitPrice?.type === "min" && <p className="text-red-500 text-sm mt-1">0’dan büyük olmalı</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">{t.fixedFee}</label>
            <input
              type="number"
              step="0.01"
              {...register("fixedFee", { required: true, min: 0 })}
              className="w-full p-2 border rounded"
            />
            {errors.fixedFee?.type === "required" && <p className="text-red-500 text-sm mt-1">Zorunlu alan</p>}
            {errors.fixedFee?.type === "min" && <p className="text-red-500 text-sm mt-1">0 veya daha büyük olmalı</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">{t.alarmThreshold}</label>
            <input
              type="number"
              step="0.01"
              {...register("alarmThreshold", { required: true, min: 0 })}
              className="w-full p-2 border rounded"
            />
            {errors.alarmThreshold?.type === "required" && <p className="text-red-500 text-sm mt-1">Zorunlu alan</p>}
            {errors.alarmThreshold?.type === "min" && <p className="text-red-500 text-sm mt-1">0 veya daha büyük olmalı</p>}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {t.save}
          </button>
        </form>
        <Toaster position="top-right" />
            </div>}
        </main>
      </div>
    );
  }
