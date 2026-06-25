import ClonedSite from "./components/cloned-site";
import Overlay from "./components/boxii/Overlay";

export default function Home() {
  return (
    <>
      <ClonedSite src="/clone.html" title="Lawbrokr" />
      <Overlay />
    </>
  );
}
