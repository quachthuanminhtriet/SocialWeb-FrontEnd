import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.footerText}>&copy; 2024 OuNetwork - Mạng xã hội cho người dùng là cựu sinh</p>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '20px 0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 1000 
    },
    footerText: {
        margin: 0
    },
    bodyContent: {
        paddingBottom: '80px' 
    }
};

export default Footer;