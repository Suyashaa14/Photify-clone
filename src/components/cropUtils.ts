// components/cropUtils.ts

export default function getCroppedImg(imageSrc: string, crop: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = "anonymous"
      image.src = imageSrc
      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
  
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }
  
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
  
        canvas.width = crop.width
        canvas.height = crop.height
  
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
  
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"))
            return
          }
          resolve(blob)
        }, "image/jpeg")
      }
  
      image.onerror = () => reject(new Error("Failed to load image"))
    })
  }
  