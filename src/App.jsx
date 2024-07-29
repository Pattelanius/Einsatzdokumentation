import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import DocumentationWrapper from './components/DocumentationContainer/DocumentationWrapper';

function App() {
  return (
    <MantineProvider>
      <DocumentationWrapper />
    </MantineProvider>
  )
}

export default App
