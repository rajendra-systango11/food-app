import { useRef } from "react";
import classes from "./image-picker.module.css";
export default  function ImagePicker({ name,label }) {
    const imageInput = useRef();
  const handleImageChange = () => {
     imageInput.current.click();
  };

  return (
    <div className={classes.picker}>
        <label htmlFor={name} >{label}</label>
        <div className={classes.control}>
    <input
      type="file"
      id={name}
      name={name}
      accept="image/*"
      className={classes.input}
      ref={imageInput}/>
      <button
        type="button"
        className={classes.button}
        onClick={handleImageChange}>Pick a Image</button>
        </div>
</div>
  );
}