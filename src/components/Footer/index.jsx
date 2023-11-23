import "./index.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="copyright">
        &copy; Copyright {new Date().getFullYear()} by Ziyi Xu
      </p>
    </footer>
  );
}
