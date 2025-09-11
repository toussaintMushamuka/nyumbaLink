import Navbar from "./Navbar";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div>
      <Navbar />
      {/* Ajout padding-top pour éviter que le contenu soit collé à la navbar */}
      <div className="px-5 md:px-[10%] pt-32 mb-10">{children}</div>
    </div>
  );
};

export default Wrapper;
