import Button from './button';
import Filler from './filler';
import Logo from './logo';

export default function Header() {
  return (
    <header className="flex h-12 items-center">
      <Logo />
      <Filler />
      <div>
        <Button>Login</Button>
      </div>
    </header>
  );
}
