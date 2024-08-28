import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Base_URL } from "../Credentails";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  Bar,
  Line,
} from "recharts";
import { CiFilter } from "react-icons/ci";
import chartIcon from "../../public/chartIcon.png";


const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const formatTick = (tick) => {
    if (tick >= 1000000) return `${(tick / 1000000).toFixed(1)}M`;
    if (tick >= 1000) return `${(tick / 1000).toFixed(0)}k`;
    return tick;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Base_URL}/getData`);
        const transformedData = response.data.map((item) => ({
          ...item,
          monthYear: parseDate(item.Date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          }),
          year: parseDate(item.Date).getFullYear(),
          month: parseDate(item.Date).toLocaleDateString("en-US", {
            month: "short",
          }),
        }));

        const uniqueYears = Array.from(
          new Set(transformedData.map((item) => item.year))
        ).sort((a, b) => b - a);
        setYears(uniqueYears);

        const uniqueMonths = Array.from(
          new Set(transformedData.map((item) => item.month))
        );
        setMonths(uniqueMonths);

        setChartData(transformedData);
        setFilteredData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let data = chartData;
      if (selectedYear !== "All") {
        data = data.filter((item) => item.year === parseInt(selectedYear));
      }
      if (selectedMonth !== "All") {
        data = data.filter((item) => item.month === selectedMonth);
      }
      setFilteredData(data);
    };
    filterData();
  }, [selectedYear, selectedMonth, chartData]);

  return (
    <main className="mx-auto mt-10 w-full h-full font-poppins">
      <div className="p-5 flex justify-between">
        <h2 className="font-semibold text-lg">Filter</h2>
        <div className="flex gap-5">
          <div className="relative">
            <button
              className="h-8 w-36 border border-gray-400 flex gap-2 font-sans rounded-sm cursor-pointer"
              onClick={() => setShowYearDropdown(!showYearDropdown)}
            >
              <CiFilter size={20} className="mt-1 ml-3" />
              <p className="text-[14px] pt-1">Filter by Year</p>
            </button>
            {showYearDropdown && (
              <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  <li
                    onClick={() => {
                      setSelectedYear("All");
                      setSelectedMonth("All");
                      setShowYearDropdown(false);
                    }}
                    className="p-2 cursor-pointer"
                  >
                    All
                  </li>
                  {years.map((year) => (
                    <li
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setShowYearDropdown(false);
                      }}
                      className={`p-2 cursor-pointer ${
                        year === selectedYear && "bg-gray-200"
                      }`}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="h-8 w-36 border border-gray-400 flex gap-2 font-sans rounded-sm cursor-pointer"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <CiFilter size={20} className="mt-1 ml-1" />
              <p className="text-[14px] pt-1">Filter by Month</p>
            </button>
            {showMonthDropdown && (
              <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  <li
                    onClick={() => {
                      setSelectedMonth("All");
                      setShowMonthDropdown(false);
                    }}
                    className="p-2 cursor-pointer"
                  >
                    All
                  </li>
                  {months.map((month) => (
                    <li
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setShowMonthDropdown(false);
                      }}
                      className={`p-2 cursor-pointer ${
                        month === selectedMonth && "bg-gray-200" 
                      }`}
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Card className="h-auto min-h-[600px]">
        <CardHeader className="text-xl text-center">
          Revenue and Profit by Month and Year
        </CardHeader>
        <div className="h-8 w-full flex justify-center items-end gap-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-8 bg-[#4682b4]"></div>
            <p>Revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={chartIcon} alt="lg" width={"35px"} height={"auto"} />
            <p>Profit</p>
          </div>
        </div>
        <CardContent className="h-[500px] w-full">
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredData}
                className={"p-8"}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 80,
                }}
              >
                <CartesianGrid strokeDasharray="6 0" />
                <XAxis
                  dataKey="monthYear"
                  label={{
                    value: "Year",
                    position: "insideBottom",
                    offset: -80,
                  }}
                  angle={-90}
                  tick={{ fontSize: 12 }}
                  textAnchor="end"
                  interval={0}
                  tickMargin={10}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Revenue",
                    angle: -90,
                    position: "insideLeft",
                    offset: -40,
                    fontWeight: "bold",
                  }}
                  domain={[0, 1200000]}
                  ticks={[0, 300000, 600000, 900000, 1200000]}
                  tickCount={6}
                  tickFormatter={formatTick}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Profit",
                    angle: 90,
                    position: "insideRight",
                    offset: -40,
                    fontWeight: "bold",
                  }}
                  domain={[0, 1200000]}
                  ticks={[0, 300000, 600000, 900000, 1200000]}
                  tickCount={6}
                  tickFormatter={formatTick}
                />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="Revenue"
                  fill="#4682b4"
                  barSize={50}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Profit "
                  stroke="#f2b90d"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default Chart;