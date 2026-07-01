import { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


export default function  Layout({children}: {children: ReactNode}) {
  return <div>
    <Header />
    {children}
    <Footer />
  </div>
}
