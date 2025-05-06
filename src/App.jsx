import { FooterComponent } from "./shared/components/Footer.component";
import { HeaderComponent } from "./shared/components/Header.component";

function App({ children }) {
  return (
    <html>
      <header>
        <HeaderComponent />
      </header>
      <body>{children}</body>
      <footer>
        <FooterComponent />
      </footer>
    </html>
  );
}

export default App;
