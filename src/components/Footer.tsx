const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © {currentYear} GeoQuery Niger. Tous droits réservés.
          </div>
          <div className="text-sm text-muted-foreground">
            Design by <span className="font-semibold text-foreground">Qwiper Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;