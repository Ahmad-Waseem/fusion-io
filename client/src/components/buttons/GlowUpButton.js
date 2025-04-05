import React from 'react';
import styles from './GlowUpButton.module.css'; // Create this CSS module file

const GlowUpButton = ({ color, children, ...props }) => {
  return (
    <button
      className={styles.button}
      style={{ '--button-hover-color': color }} // Set a CSS variable
      {...props}
    >
      {children}
    </button>
  );
};

export default GlowUpButton;