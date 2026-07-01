import { ReactNode } from "react";
import Header from "../shared/ui/Header/Header";
import Footer from "../shared/ui/Footer/Footer";


export default function  Layout({children}: {children: ReactNode}) {
  return <div>
    <Header />
    {children}
    <Footer />
  </div>
}
