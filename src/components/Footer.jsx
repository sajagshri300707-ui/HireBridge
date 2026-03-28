import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
      <p>&copy; {new Date().getFullYear()} HireBridge. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
