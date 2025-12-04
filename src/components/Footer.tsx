import logoTechbulls from "../../public/logo-techbulls.svg";

export const Footer = () => {
  return (
    <footer className="mt-5 w-full bg-[#f7f3f7] py-[8px] px-[8px] sm:py-[10px] sm:px-[10px] border-t border-gray-200">
      <div
    className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col items-center justify-center gap-1"
  >
    <p
      className="flex flex-wrap items-center justify-center gap-1 text-sm sm:text-base leading-tight"
    >
      <span className="text-foreground">Powered by</span>
      <img src={logoTechbulls} alt="Techbulls" className="h-4" />
    </p>

    <p className="text-[10px] sm:text-xs text-muted-foreground">
      Copyright &copy; 2025
    </p>
  </div>
    </footer>
  );
};
