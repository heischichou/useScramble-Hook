import { type JSX } from "react";

// components
import Container from "./ui/container";
import DemoSection from "./ui/demo-section";
import Footer from "./ui/footer";

export default function Page(): JSX.Element {
  return (
    // Demo Page
    <main id="Demo">
      {/* Demo Sections */}
      <Container className="py-50">
        <div className="flex flex-col gap-y-100">
          <DemoSection header="Faster text scrambling" duration={1} />

          <DemoSection header="Slower text scrambling" duration={6} />

          <DemoSection
            header="Scramble without width maintained (text grows letter by letter)"
            duration={3}
            maintainWidth={false}
          />

          <DemoSection header="Scramble with width maintained" duration={3} />
        </div>
      </Container>
      {/* End of Demo Sections */}

      <Footer />
    </main>
    // End of Demo Page
  );
}
