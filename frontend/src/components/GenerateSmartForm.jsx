import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import GenerateSmartFormExtend from "./GenerateSmartFormExtend";
import Footer from "./Footer";

const GenerateSmartForm = () => {
  return (
    <CopilotKit runtimeUrl="http://localhost:3000/api">
      <div
        style={{
          "--copilot-kit-primary-color": "#0077ff",
        }}
      >
        <CopilotPopup
          labels={{
            title: "Smartform Assistant",
            initial: "Hey! Curious about quiz with smartforms? Feel free to ask anything about generating them, I'm here to help!",
          }}
        />
      </div>
      <GenerateSmartFormExtend />
      <Footer />
    </CopilotKit>
  );
};

export default GenerateSmartForm;
