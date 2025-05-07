import { Provider } from 'react-redux';
import { store } from './app/store';

import Frame3D from './features/frame/frame3D';
import ControlPanelLeft from './components/ControlPanelLeft';
import ControlPanelRight from './components/ControlPanelRight';

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          fontFamily: 'sans-serif',
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(180deg, #d3cce3 0%, #e9e4f0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Controls */}
        <div style={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)' }}>
          <ControlPanelLeft />
        </div>

        {/* Center Canvas */}
        <div style={{ width: '800px', height: '500px', overflow: 'hidden' }}>
          <Frame3D />
        </div>

        {/* Right Controls */}
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <ControlPanelRight />
        </div>
      </div>
    </Provider>
  );
}

export default App;
