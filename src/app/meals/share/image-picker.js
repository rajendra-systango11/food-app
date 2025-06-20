'use client';
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ name, label }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();
  const handleImageChange = () => {
    const file = imageInput.current.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result);
    }
  reader.readAsDataURL(file);
  };

  const handleImagePicker = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Picked"  fill/>
          ) : (
            <p>No image picked yet.</p>
          )}
              </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/*"
          className={classes.input}
          required
          onChange={handleImageChange}
          ref={imageInput}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleImagePicker}
        >
          Pick a Image
        </button>
      </div>
    </div>
  );
}
