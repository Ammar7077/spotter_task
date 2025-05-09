import { FooterComponent } from "./shared/components/Footer.component";
import { HeaderComponent } from "./shared/components/Header.component";

function App({ children }) {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  );
}

export default App;
