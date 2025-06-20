import styles from './page.module.css';

export default function CommunityPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hello Community Page</h1>
      <p className={styles.paragraph}>Welcome to the community page!</p>
      <p className={styles.paragraph}>
        Here you can connect with other foodies, share your experiences, and discover new recipes.
      </p>
      <p className={styles.paragraph}>
        Join discussions, ask questions, and share your culinary adventures.
      </p>
    </div>
  );
}
