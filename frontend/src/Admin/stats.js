import { Stack, Typography } from "@mui/material";
import React from "react";
import { Paper, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const AdminStatistics = () => {
  return (
    <div>
      <Item>Heins Business Statistics</Item>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper elevation={24}>
          <Item>Active Bookings</Item>
          <Stack />
          <Item>66</Item>
        </Paper>
        <Stack spacing={1} />
        <Paper elevation={24}>
          <Item>Active Hosts</Item>
          <Stack />
          <Item>120</Item>
        </Paper>
        <Stack spacing={1} />
        <Paper elevation={24}>
          <Item>New Clients</Item>
          <Stack />
          <Item>33</Item>
        </Paper>
        <Stack spacing={1} />
        <Paper elevation={24}>
          <Item>Reserved Bookings</Item>
          <Stack />
          <Item>14</Item>
        </Paper>
      </Box>
    </div>
  );
};
export default AdminStatistics;
