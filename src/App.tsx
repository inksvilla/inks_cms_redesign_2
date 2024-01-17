import { Authenticated, Refine } from "@refinedev/core";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  TextFieldComponent,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { API_URL } from "./constants";
import { dataProvider } from "./rest-data-provider";
import { MerchantEdit, MerchantList } from "./pages/merchants";
import { CustomerEdit, CustomerList } from "./pages/customers";
import { MerchantShow } from "./pages/merchants/show";

function App() {
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "customer", // override this resource name when fetching
                list: "/customers",
                edit: "/customers/edit/:id",
                meta: {
                  canDelete: false,
                },
              },
              {
                name: "users/merchant", // override this resource name when fetching
                list: "/merchants",
                edit: "/merchants/edit/:id",
                show: "/merchants/show/:id",
                meta: {
                  canDelete: false,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "W45kuM-bkw7bm-6o3KAQ",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2
                      Sider={() => (
                        <ThemedSiderV2
                          Title={({ collapsed }) =>
                            collapsed ? (
                              <></>
                            ) : (
                              <TextFieldComponent
                                fontSize={16}
                                value="Inksvilla Admin Panel"
                              />
                            )
                          }
                        />
                      )}
                      Header={() => <Header sticky />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />
                <Route path="/customers">
                  <Route index element={<CustomerList />} />
                  <Route path="edit/:id" element={<CustomerEdit />} />
                </Route>
                <Route path="/merchants">
                  <Route index element={<MerchantList />} />
                  <Route path="edit/:id" element={<MerchantEdit />} />
                  <Route path="show/:id" element={<MerchantShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-outer"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
