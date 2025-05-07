// import { useDispatch, useSelector } from 'react-redux';
// import { setZoom, setRotation, toggleMirror, togglePlay, reset, toggleWrap } from '../features/frame/frameSlice';
// import type { RootState } from '../app/store';

// export default function ControlPanel() {
//   const dispatch = useDispatch();
//   const { isPlaying } = useSelector((state: RootState) => state.frame);

//   // Auto-Rotation logic
//   let rotationInterval: NodeJS.Timeout | null = null;
//   const startRotation = () => {
//     if (!rotationInterval) {
//       rotationInterval = setInterval(() => {
//         dispatch(setRotation(Math.PI / 180 * 10)); // rotate 10 degrees every interval
//       }, 50); // Adjust speed here
//     }
//   };

//   const stopRotation = () => {
//     if (rotationInterval) {
//       clearInterval(rotationInterval);
//       rotationInterval = null;
//     }
//   };

//   const toggleAutoPlay = () => {
//     dispatch(togglePlay());
//     if (!isPlaying) {
//       startRotation();
//     } else {
//       stopRotation();
//     }
//   };

//   return (
//     <div style={{ position: 'absolute', top: 20, left: 20, background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
//       <h3>Controls</h3>
//       <button onClick={() => dispatch(setZoom(1.2))}>Zoom In</button>
//       <button onClick={() => dispatch(setZoom(1))}>Reset Zoom</button>
//       <button onClick={() => dispatch(setRotation(Math.PI / 4))}>Rotate</button>
//       <button onClick={() => dispatch(toggleMirror())}>Mirror</button>
//       <button onClick={toggleAutoPlay}>{isPlaying ? 'Pause' : 'Play'}</button> {/* Play/Pause */}
//       <button onClick={() => dispatch(reset())}>Center</button> {/* Reset rotation & zoom */}
//       <button onClick={() => dispatch(toggleWrap())}>Wrapped</button> {/* Wrap */}
//       <button onClick={() => dispatch(setZoom(0.8))}>Zoom Out</button>
//       <button onClick={() => dispatch(setRotation(0))}>Reset Rotation</button> {/* Reset Rotation */}
//     </div>
//   );
// }
