import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FrameState {
  isPlaying: boolean;
  isMirrored: boolean;
  isWrapped: boolean;
  zoom: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  viewMode: 'room' | '3d';
  frameType: 1 | 2;
}

const initialState: FrameState = {
  isPlaying: false,
  isMirrored: false,
  isWrapped: false,
  zoom: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  viewMode: '3d',
  frameType: 1,
};

const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    togglePlay: (state) => { state.isPlaying = !state.isPlaying; },
    reset: (state) => {
        console.log("hello from slice")
      state.zoom = 1;
      state.rotationX = 0;
      state.rotationY = 0;
      state.rotationZ = 0;
    },
    setZoom: (state, action: PayloadAction<number>) => { state.zoom *= action.payload; },
    setRotationX: (state, action: PayloadAction<number>) => { state.rotationX = action.payload; },
    setRotationY: (state, action: PayloadAction<number>) => { state.rotationY = action.payload; },
    setRotationZ: (state, action: PayloadAction<number>) => { state.rotationZ = action.payload; },
    toggleMirror: (state) => { state.isMirrored = !state.isMirrored; },
    toggleWrap: (state) => { state.isWrapped = !state.isWrapped; },
    setView: (state, action: PayloadAction<'room' | '3d'>) => { state.viewMode = action.payload; },
    setFrame: (state, action: PayloadAction<1 | 2>) => { state.frameType = action.payload; },
  }
});

export const {
  togglePlay,
  reset,
  setZoom,
  setRotationX,
  setRotationY,
  setRotationZ,
  toggleMirror,
  toggleWrap,
  setView,
  setFrame
} = frameSlice.actions;

export default frameSlice.reducer;
