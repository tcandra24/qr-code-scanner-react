import HeaderSection from "../components/header-section";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HeaderSection />

      <div className="container mx-auto mt-16">{children}</div>
    </>
  );
};

export default DefaultLayout;
