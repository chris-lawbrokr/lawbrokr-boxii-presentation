import ClonedSite from "./components/cloned-site";
import BoxiiEmbed from "./components/boxii-embed";

export default function Home() {
  return (
    <>
      <ClonedSite src="/clone.html" title="Lawbrokr" />
      <BoxiiEmbed />
    </>
  );
}
