const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <span className="font-semibold text-foreground">techbulls</span>
        </p>
        <p className="text-xs text-muted-foreground">Copyright © 2025</p>
      </div>
    </footer>
  );
};

export { Footer };
