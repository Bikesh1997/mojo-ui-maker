import logoTechbulls from "../../public/logo-techbulls.svg";

export const Footer = () => {
  return (
    <footer className="m-5 w-full bg-background py-2 px-2 sm:py-2.5 sm:px-2.5 border-t border-border">
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
