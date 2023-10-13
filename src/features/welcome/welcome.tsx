import { WelcomeContainer, WelcomeLayout, WelcomeStepsContainer } from "./Welcome.styles"
import Footer from "./components/Footer"
import Header from "./components/Header"
import WelcomeProvider from "./components/Layout"
import StepActions from "./components/StepActions"
import { Steps } from "./context/Step"
import AddWordDictionary from "./steps/AddWordDictionary"
import SetupPage from "./steps/Setup"
import TranslateText from "./steps/TranslateText"

import "~/styles/main.css"

const Welcome = () => {
  return (
    <WelcomeProvider>
      <WelcomeLayout className="mx-auto w-full h-screen">
        <WelcomeContainer>
          <Header />
          <WelcomeStepsContainer>
            <Steps startsFrom={1} onStepChange={() => {}}>
              <TranslateText />
              <AddWordDictionary />
              <SetupPage />
            </Steps>
            <StepActions />
          </WelcomeStepsContainer>
          <Footer />
        </WelcomeContainer>
      </WelcomeLayout>
    </WelcomeProvider>
  )
}

export default Welcome
