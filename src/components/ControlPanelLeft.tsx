"use client"

import { useDispatch, useSelector } from "react-redux"
import { setZoom, setRotationX, setRotationY, setRotationZ, togglePlay, reset } from "../features/frame/frameSlice"
import type { RootState } from "../app/store"
import Button from "./Button"

export default function ControlPanelLeft() {
  const dispatch = useDispatch()
  const { isPlaying, viewMode } = useSelector((state: RootState) => state.frame)

  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <Button onClick={() => dispatch(togglePlay())}>{isPlaying ? "Pause" : "Play"}</Button>

      <Button onClick={() => dispatch(reset())}>Center</Button>

      <Button onClick={() => dispatch(setZoom(1.2))}>Zoom In</Button>

      <Button onClick={() => dispatch(setZoom(0.8))}>Zoom Out</Button>

      <Button
        onClick={() => {
          dispatch(setRotationX(0))
          dispatch(setRotationY(0))
          dispatch(setRotationZ(0))
        }}
        disabled={viewMode === "room"}
      >
        Crop
      </Button>
    </div>
  )
}
