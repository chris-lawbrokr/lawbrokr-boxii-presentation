import ClonedSite from "./components/cloned-site";
import Overlay from "./components/overlay";

export default function Home() {
  return (
    <>
      <ClonedSite src="/clone.html" title="Mycroft" />
      <Overlay />
    </>
  );
}
