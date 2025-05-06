import { HeaderButtonComponent } from "./HeaderButton.component";

export const HeaderComponent = () => {
  return (
    <div className="h-16 flex p-5">
      <div className="justify-start justify-items-center inline-flex gap-5">
        <p>Google</p>
        <HeaderButtonComponent />
        <HeaderButtonComponent />
        <HeaderButtonComponent />
      </div>
    </div>
  );
};
