import "@/styles/globals.css";
import "swiper/css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/context/authContext";

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
};

export default App;
