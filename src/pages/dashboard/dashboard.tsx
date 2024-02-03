import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useCustom } from "@refinedev/core";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { API_URL } from "../../constants";

export default function Dashboard() {
  const { data, isLoading } = useCustom({
    url: `${API_URL}/dashboard/admin`,
    method: "get",
  });

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const dashboard = data?.data?.data;
  const customers = dashboard?.customers;
  const merchants = dashboard?.merchants;
  const products = dashboard?.products;
  const services = dashboard?.services;

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  // get chart data based on the currently selected tab index
  const getChartData = () => {
    switch (currentTabIndex) {
      case 0:
        return { data: customers?.last12Months, dataKey: "customers" };
      case 1:
        return { data: merchants?.last12Months, dataKey: "merchants" };
      case 2:
        return { data: products?.last12Months, dataKey: "products" };
      case 3:
        return { data: services?.last12Months, dataKey: "services" };
      default:
        return { data: [], dataKey: "" };
    }
  };

  const chartData = getChartData();

  return (
    <Box>
      <Typography sx={{ fontWeight: "medium", fontSize: 24 }} mb={3}>
        Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          columnGap: "40px",
          rowGap: "25px",
          flexWrap: "wrap",
          marginBottom: 3,
          paddingBottom: 5,
          borderBottom: "2px solid #E5E7EB",
        }}
      >
        <SummaryCard
          title="Customers"
          content={[
            { title: "Total", value: customers?.total },
            { title: "Active", value: customers?.active },
            { title: "Blocked", value: customers?.blocked },
            { title: "Suspended", value: customers?.suspended },
          ]}
        />
        <SummaryCard
          title="Merchants"
          content={[
            { title: "Total", value: merchants?.total },
            { title: "Active", value: merchants?.active },
            { title: "Pending", value: merchants?.pending },
            { title: "Blocked", value: merchants?.blocked },
          ]}
        />
        <SummaryCard
          title="Products"
          content={[
            { title: "Total", value: products?.active },
            { title: "Active", value: products?.inactive },
            { title: "Inactive", value: products?.inactive },
          ]}
        />
        <SummaryCard
          title="Services"
          content={[
            { title: "Total", value: services?.total },
            { title: "Active", value: services?.active },
            { title: "Inactive", value: services?.inactive },
          ]}
        />
      </Box>
      <Tabs
        sx={{ marginBottom: 3 }}
        value={currentTabIndex}
        onChange={handleTabChange}
      >
        <Tab label="Customers" />
        <Tab label="Merchants" />
        <Tab label="Products" />
        <Tab label="Services" />
      </Tabs>
      <Typography sx={{ fontWeight: "medium", fontSize: 18 }} mb={3}>
        Activity For Last 12 Months
      </Typography>
      <DashboardChart dataKey={chartData.dataKey} data={chartData.data} />
    </Box>
  );
}

interface SummaryCardProps {
  title: string;
  content: { title: string; value: number }[];
}

const SummaryCard = ({ title, content }: SummaryCardProps) => {
  // divide content into two parts
  const section1 = content.slice(0, content.length / 2);
  const section2 = content.slice(content.length / 2, content.length);

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          color={"text.secondary"}
          mb={2}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", width: "full", marginBottom: 3 }}>
          {section1.map((item, index) => (
            <Box key={index} sx={{ flexGrow: 1 }}>
              <Typography color={"text.secondary"}>{item.title}</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: "medium" }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", width: "full" }}>
          {section2.map((item, index) => (
            <Box key={index} sx={{ flexGrow: 1 }}>
              <Typography color={"text.secondary"}>{item.title}</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: "medium" }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardChart = ({ dataKey, data }: { dataKey: string; data: any }) => {
  return (
    <Box height={700}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
