import NavBar from '../NavBar'

type HeaderProps = {
  url: URL;
}

export default function Header({url}: HeaderProps) {
  return (
    <header>
      <div>
        <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo" />
        <h1>Welcome to <a href="https://astro.build/">Astro</a></h1>
        <NavBar url={url} />
      </div>
    </header>
  )
}
