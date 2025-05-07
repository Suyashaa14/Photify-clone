"use client"

import { useDispatch, useSelector } from "react-redux"
import { toggleMirror, toggleWrap, setView, setFrame } from "../features/frame/frameSlice"
import type { RootState } from "../app/store"
import Button from "./Button"

export default function ControlPanelRight() {
  const dispatch = useDispatch()
  const { viewMode, frameType } = useSelector((state: RootState) => state.frame)

  const buttonGroupStyle = { display: "flex", marginBottom: "10px" }

  return (
    <div>
      <div style={buttonGroupStyle}>
        <Button onClick={() => dispatch(setView("room"))} active={viewMode === "room"}>
          Room View
        </Button>
        <Button onClick={() => dispatch(setView("3d"))} active={viewMode === "3d"}>
          3D View
        </Button>
      </div>
      <div style={buttonGroupStyle}>
        <Button onClick={() => dispatch(toggleWrap())} active={false}>
          Wrapped
        </Button>
        <Button onClick={() => dispatch(toggleMirror())} active={true}>
          Mirrored
        </Button>
      </div>
      <div style={buttonGroupStyle}>
        <Button onClick={() => dispatch(setFrame(1))} active={frameType === 1}>
          Frame-1
        </Button>
        <Button onClick={() => dispatch(setFrame(2))} active={frameType === 2}>
          Frame-2
        </Button>
      </div>
    </div>
  )
}
