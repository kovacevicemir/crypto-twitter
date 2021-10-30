// material
import { Box, Grid, Container, Typography, Paper } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";
import TestComponent from "../components/TestComponent";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
} from "../components/_dashboard/blog";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const storeData = useSelector((state) => state.tweets); //Download
  console.log(storeData);

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <TestComponent />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Typography
            color="primary"
            component="h4"
            variant="h4"
            style={{ marginBottom: "15px", marginTop:"50px" }}
          >
            Tweets:
          </Typography>

          <Grid container spacing={3} marginBottom={5}>
            {storeData.map((post, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={2} style={{ padding: "2px" }}>
                  {post.tweet}
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
