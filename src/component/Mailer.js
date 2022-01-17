import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Mailer = () => {
  const [successState, setSuccessState] = useState('');
  const [errorState, setErrorState] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    const userNameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    if (
      userNameField.value == '' &&
      emailField.value == '' &&
      messageField.value == ''
    ) {
      setErrorState(true);
      setSuccessState('Please fill all the fields. ');
      setTimeout(() => {
        setSuccessState('');
      }, 2000);
    } else {
      emailjs
        .sendForm(
          'service_5v1z5c9',
          'template_yhl1z9d',
          e.target,
          'user_MdRfCkoipsqTwiF9k1N9Q'
        )
        .then((response) => {
          console.log('success->', response);
          if (response.status == 200 || response.text == 'ok') {
            setSuccessState('Form Submitted Successfully!');
            setErrorState(false);
            setTimeout(() => {
              setSuccessState('');
              userNameField.value = '';
              emailField.value = '';
              messageField.value = '';
            }, 2000);
          } else {
            setErrorState(true);
            setTimeout(() => {
              setSuccessState('');
            }, 2000);
          }
        })
        .catch((error) => {
          console.log('error->', error);
          setSuccessState('Form Submitted Error!');
          setErrorState(true);
          setTimeout(() => {
            setSuccessState('');
          }, 2000);
        });
    }
  };
  return (
    <div
      className="container border"
      style={{
        marginTop: '50px',
        width: '50%',
        backgroundImage: `url('https://media.istockphoto.com/photos/spring-beautiful-background-with-green-juicy-young-foliage-and-empty-picture-id1301592032?b=1&k=20&m=1301592032&s=170667a&w=0&h=TwSiOgSX3Kc8hRKREuPAg3SQfhLngTMQqAI-xldjuvg=')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 style={{ marginTop: '25px' }}>Contact Us</h1>
      {errorState == true ? (
        <>
          <p style={{ color: 'red' }}>{successState}</p>
        </>
      ) : (
        <>
          <p style={{ color: 'green' }}>{successState}</p>
        </>
      )}
      <form
        onSubmit={sendEmail}
        className="row"
        style={{ margin: '25px 85px 75px 100px' }}
      >
        <label>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="useremail"
          className="form-control"
        />

        <label>Message</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          className="form-control"
        />
        <input
          type="submit"
          value="Send"
          className="form-control btn btn-primary"
          style={{ marginTop: '30px' }}
        />
      </form>
    </div>
  );
};

export default Mailer;
