import { useDispatch, useSelector } from 'react-redux';
import { setZoom, setRotationX, setRotationY, setRotationZ, toggleMirror, togglePlay, reset, toggleWrap } from '../features/frame/frameSlice';
import type { RootState } from '../app/store';

export default function ControlPanelLeft() {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state: RootState) => state.frame);

    const buttonStyle = {
        display: 'block',
        marginBottom: '10px',
        padding: '10px 20px',
        backgroundColor: '#d43f7d',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100px',
    };

    return (
        <div>
            <button style={buttonStyle} onClick={() => dispatch(togglePlay())}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button style={buttonStyle} onClick={() => { console.log("hello button clicked") 
                dispatch(reset()) }}>
                Center
            </button>

            <button style={buttonStyle} onClick={() => dispatch(setZoom(1.2))}>
                Zoom In
            </button>

            <button style={buttonStyle} onClick={() => dispatch(setZoom(0.8))}>
                Zoom Out
            </button>

            <button style={buttonStyle} onClick={() => {
                dispatch(setRotationX(0));
                dispatch(setRotationY(0));
                dispatch(setRotationZ(0));
            }}>
                Crop
            </button>
        </div>
    );
}
