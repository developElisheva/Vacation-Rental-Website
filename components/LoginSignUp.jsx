import React, { useState, useEffect } from 'react';
import { login, sign } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles/LoginSignUp.css';

const Form = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    addPhone: ''
  });
  const [error, setError] = useState(''); // שדה חדש להודעות שגיאה
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setActiveTab('login');
    } else {
      setActiveTab('signup');
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // לאפס את השגיאה לפני שליחת הבקשה
    try {
      if (activeTab === 'login') {
        const response = await login(formData);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/PublishApartment');
        }
      } else if (activeTab === 'signup') {
        const response = await sign(formData);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/PublishApartment');
        }
      }
    } catch (error) {
      if (error.response) {
        // אם השגיאה היא שהמייל לא נמצא, נבצע מעבר לדף הרישום
        if (error.response.status === 404 && activeTab === 'login') {
          setActiveTab('signup'); // אם המייל לא נמצא, נעבור לדף הרישום
          setError('המייל לא נמצא, נא הירשם'); // הצגת הודעת שגיאה
        }
        // אם הסיסמה לא נכונה
        else if (error.response.status === 400 && activeTab === 'login') {
          setError('הסיסמה לא נכונה'); // הצגת הודעת שגיאה
        }
        // שגיאה אחרת, הודעה כללית
        else {
          setError('שגיאה במהלך הבקשה, נסה שוב מאוחר יותר');
        }
      } else {
        setError('בעיה בחיבור עם השרת, נסה שוב מאוחר יותר');
      }
    }
  };

  return (
    <div className="center-container">
      <div className="form">
        <ul className="tab-group">
          <li className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabChange('signup')}>
            <a href="#signup">Sign Up</a>
          </li>
          <li className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>
            <a href="#login">Log In</a>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'signup' && (
            <div id="signup">
              <h1>Sign Up for Free</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <label>Email Address<span className="req">*</span></label>
                  <input className="form-control" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="field-wrap">
                  <label>Password<span className="req">*</span></label>
                  <input className="form-control" type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="field-wrap">
                  <label>Phone<span className="req">*</span></label>
                  <input className="form-control" type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="field-wrap">
                  <label>Additional Phone</label>
                  <input className="form-control" type="text" name="addPhone" value={formData.addPhone} onChange={handleInputChange} />
                </div>
                <button type="submit" className="button button-block">Get Started</button>
              </form>
            </div>
          )}

          {activeTab === 'login' && (
            <div id="login">
              <h1>Welcome Back!</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <label>Email Address<span className="req">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="field-wrap">
                  <label>Password<span className="req">*</span></label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <p className="forgot"><a href="#">Forgot Password?</a></p>
                <button type="submit" className="button button-block">Log In</button>
              </form>
            </div>
          )}

          {error && <div className="error-message">{error}</div>} {/* הצגת השגיאה כאן */}
        </div>
      </div>
    </div>
  );
};

export default Form;
