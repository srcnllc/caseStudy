import React from 'react'
import Hourly from '@/mocks/hourly'

export default function Tuketim({dailyTotal,savedSettings,darkMode,t}) {
  return (
                <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
      <div className={`max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm  text-center
      ${
        darkMode && "dark:bg-gray-800 dark:border-gray-700"
      }
      `}
      >
        <p className="text-lg font-medium mb-2">{t.finalReading} (kWh)</p>
        <span className="text-3xl font-bold">
          {Hourly[Hourly.length - 1].kwh } kWh
        </span>
        <div className="text-sm text-gray-500 mt-1">
          {new Date(Hourly[Hourly.length - 1].ts).toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
      </div>
      <div className={`max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm  text-center
      ${
        darkMode && "dark:bg-gray-800 dark:border-gray-700"
      }
      `}>
        <p className="text-lg font-medium mb-2">{t.todayTotal} (kWh)</p>
        <span className="text-3xl font-bold">
          {Hourly.reduce((sum, item) => sum + parseFloat(item.kwh), 0).toFixed(1)} kWh
        </span>
      </div>
      <div className={`max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm  text-center
      ${
        darkMode && "dark:bg-gray-800 dark:border-gray-700"
      }
      `}>
        <p className="text-lg font-medium mb-2">{t.monthlyEstimatedBill} (TL)</p>
        <span className="text-3xl font-bold">
    {(dailyTotal * 30 * parseFloat(savedSettings.unitPrice) + parseFloat(savedSettings.fixedFee))
        .toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
        </span>
      </div>
      </div>
  )
}
