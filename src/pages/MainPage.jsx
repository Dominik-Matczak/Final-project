import "../styles/MainPage.scss";
import PageContent from "../components/PageContent";
import { useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainPage() {
  const { basket, setBasket, books, loading, selectedKind, setSelectedKind } = useOutletContext();
  

  return (
    <>
      <Header basket={basket} />
      <PageContent
        books={books}
        loading={loading}
        selectedKind={selectedKind}
        setSelectedKind={setSelectedKind}
        basket={basket}
        setBasket={setBasket}
      />
      <Footer />
    </>
  );
}
