export default function Header() {
  return (
    <>
    <header>
      <div>
        <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo">
        <h1>Welcome to <a href="https://astro.build/">Astro</a></h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Posts</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
    </>
  );
}
