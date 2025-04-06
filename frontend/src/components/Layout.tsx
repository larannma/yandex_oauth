const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden p-10 bg-background text-foreground flex flex-col">
      {children}
    </div>
  );
};


export default Layout;
