import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import GenerateSmartFormExtend from "./GenerateSmartFormExtend";

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
            title: "Your Assistant",
            initial: "Hi! Ask me anything?",
          }}
        />
      </div>
      <GenerateSmartFormExtend/>
    </CopilotKit>
  );
};


export default GenerateSmartForm;
