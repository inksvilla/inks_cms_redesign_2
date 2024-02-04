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

  const [tab, setCurrentTab] = useState<string>("customers");

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
  const customerStats = dashboard?.customerStats;
  const merchantStats = dashboard?.merchantStats;
  const productStats = dashboard?.productStats;
  const serviceStats = dashboard?.serviceStats;
  const paymentStats = dashboard?.paymentStats;

  const handleTabChange = (e: React.SyntheticEvent, value: string) => {
    setCurrentTab(value);
  };

  // get chart data based on the currently selected tab index
  const getChartData = () => {
    switch (tab) {
      case "customers":
        return { data: customerStats?.last12Months, dataKey: tab };
      case "merchants":
        return { data: merchantStats?.last12Months, dataKey: tab };
      case "products":
        return { data: productStats?.last12Months, dataKey: tab };
      case "services":
        return { data: serviceStats?.last12Months, dataKey: tab };
      case "payments":
        return { data: paymentStats?.last12Months, dataKey: tab };
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
            { title: "Total", value: customerStats?.total },
            { title: "Active", value: customerStats?.active },
            { title: "Blocked", value: customerStats?.blocked },
            { title: "Suspended", value: customerStats?.suspended },
          ]}
        />
        <SummaryCard
          title="Merchants"
          content={[
            { title: "Total", value: merchantStats?.total },
            { title: "Active", value: merchantStats?.active },
            { title: "Pending", value: merchantStats?.pending },
            { title: "Blocked", value: merchantStats?.blocked },
          ]}
        />
        <SummaryCard
          title="Products"
          content={[
            { title: "Total", value: productStats?.total },
            { title: "Active", value: productStats?.active },
            { title: "Inactive", value: productStats?.inactive },
          ]}
        />
        <SummaryCard
          title="Services"
          content={[
            { title: "Total", value: serviceStats?.total },
            { title: "Active", value: serviceStats?.active },
            { title: "Inactive", value: serviceStats?.inactive },
          ]}
        />
        <SummaryCard
          title="Payments"
          content={[
            { title: "Total", value: paymentStats?.total },
            { title: "Initiated", value: paymentStats?.initiated },
            { title: "Paid", value: paymentStats?.paid },
            { title: "Failed", value: paymentStats?.failed },
          ]}
        />
      </Box>
      <Tabs sx={{ marginBottom: 3 }} value={tab} onChange={handleTabChange}>
        <Tab label="Customers" value="customers" />
        <Tab label="Merchants" value="merchants" />
        <Tab label="Products" value="products" />
        <Tab label="Services" value="services" />
        <Tab label="Payments" value="payments" />
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
          <XAxis dataKey="monthName" />
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
