import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MyDispatchContext } from '../../../App';

const Header = () => {
    const [kw, setKw] = useState("");
    const nav = useNavigate();
    const dispatch = useContext(MyDispatchContext);

    const submit = (e) => {
        e.preventDefault();

        nav(`/?kw=${kw}`);
    }
    
    const handleLogout = () => {
        try {

            dispatch({ "type": "logout" });

        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <header style={Styles.header}>
            <div>
                <Link to="/" style={Styles.logo}>
                    <img src="https://res.cloudinary.com/dchyeg7pv/image/upload/v1723688079/LogoOU.webp" alt="Logo" style={Styles.logo} />
                </Link>
            </div>
            <Form onSubmit={submit}>
                <input type="text" placeholder="Tìm kiếm..." style={Styles.search} value={kw || ''} onChange={e => setKw(e.target.value)} />
                <Link to="/messages" style={Styles.link}>Messages</Link>
                <Link to="/notifications" style={Styles.link}>Notifications</Link>
                <Link to="/login" style={Styles.link}><FontAwesomeIcon icon={faUserAlt} size="1x" color="white" /></Link>
                <Button onClick={handleLogout}>Logout</Button>
            </Form>
        </header>
    );
}

const Styles = {
    header: {
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
    },
    logo: {
        width: '75px',
        height: '50px', 
        marginRight: '20px',
        transition: 'transform 0.3s',
        textDecoration: 'none',
    },
    search: {
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        margin: '0 10px'
    }, button: {
        margin: "10px 0px 16px 10px",
    },
};

export default Header;