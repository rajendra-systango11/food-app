'use client'
import { useRouter } from 'next/navigation';
import classes from '../page.module.css';


export default  function BackButton() {
    const router = useRouter();
    return (
      <button type="button" onClick={() => router.back()} className={classes.backButton}>
        Back
      </button>
    );
  }