import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const url = "http://localhost:6001";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/getData`);
     
        const transformedData = response.data.map(item => ({
          ...item,
          monthYear: parseDate(item.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
        }));
        setChartData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto m-10">
      <Card className="h-auto">
        <CardHeader className="text-xl text-center">Revenue and Profit by Month and Year</CardHeader>
        <CardContent className="h-full w-full">
          <ResponsiveContainer width="100%" height={400}> 
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="monthYear"
                tick={{ fontSize: 12 }}
                angle={-90}
                textAnchor="end"
                interval={0} 
                tickMargin={10} 
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Revenue" fill="#4682b4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
};

export default Chart;
