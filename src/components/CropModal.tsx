// components/CropModal.tsx

import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import getCroppedImg from "./cropUtils" 

interface CropModalProps {
  imageSrc: string
  onCropComplete: (croppedBlob: Blob) => void
}

const CropModal: React.FC<CropModalProps> = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [open, setOpen] = useState(true)

  const onCropCompleteCallback = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleCrop = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      onCropComplete(croppedBlob)
      handleClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <div style={{ position: "relative", width: "100%", height: 400, background: "#333" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
            aspect={undefined} // <-- ✨ Freeform cropping (NO locked aspect)
            cropShape="rect" // rectangular (not circle)
            showGrid={true}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ color: "#444" }}>Zoom</span>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(_: any, value: number) => setZoom(value as number)}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCrop}>
          Crop & Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CropModal
