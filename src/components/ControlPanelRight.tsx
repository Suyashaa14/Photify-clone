import { useDispatch } from 'react-redux';
import { toggleMirror, toggleWrap } from '../features/frame/frameSlice';

export default function ControlPanelRight() {
  const dispatch = useDispatch();

  const buttonGroupStyle = { display: 'flex', marginBottom: '10px' };
  const buttonStyle = {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '5px',
  };

  const activeButton = {
    ...buttonStyle,
    backgroundColor: '#d43f7d',
    color: '#fff',
  };
  const inactiveButton = {
    ...buttonStyle,
    backgroundColor: '#fff',
    color: '#333',
  };

  return (
    <div>
      <div style={buttonGroupStyle}>
        <button style={inactiveButton}>Room View</button>
        <button style={activeButton}>3D View</button>
      </div>
      <div style={buttonGroupStyle}>
        <button style={inactiveButton} onClick={() => dispatch(toggleWrap())}>Wrapped</button>
        <button style={activeButton} onClick={() => dispatch(toggleMirror())}>Mirrored</button>
      </div>
      <div style={buttonGroupStyle}>
        <button style={activeButton}>Frame-1</button>
        <button style={inactiveButton}>Frame-2</button>
      </div>
    </div>
  );
}
