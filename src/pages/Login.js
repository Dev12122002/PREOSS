import { useState, useRef } from 'react';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Login.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ isLoggedIn, setLoggedIn }) {
    const [validated, setValidated] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [objectid, setObjectId] = useState('');

    const loginButtonRef = useRef();
    const resendButtonRef = useRef();
    const navigate = useNavigate();

    const sendOTPRequestBody = {
        "EmployeeID": employeeId,
        "DeviceInfo": {
            "appversion": "1.0.0",
            "devicemodelname": "M2007J20CI",
            "macaddress": "32cb6b398e686a4a",
            "deviceid": "eXTAKp7hQPyHLTXF27jQSC:APA91bFO3C6qIh_M6agLOn3eGkRWzlzJVFPTylHmeid8a98qP1SU-E3wYfLUCNdsfkkd1sn1RFpA2Zr5FzeXSswy_atMNPcE98Q2OBR-7NOjBu6FgYl0Ob2gOg7d66tT8OHj9l4KYALF",
            "os": null,
            "osversion": "12"
        }
    };

    const verifyOTPRequestBody = {
        "EmployeeID": employeeId,
        "ObjectID": objectid,
        "OTP": "",
        "DeviceInfo": {
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
            "name": "Google Chrome",
            "icon": "assets/images/browser/chrome.png",
            "version": "117.0.0.0",
            "platform": "windows",
            "pattern": "#(?<browser>Version|Chrome|other)[/ ]+(?<version>[0-9.|a-zA-Z.]*)#",
            "ipaddress": "49.36.71.234"
        },
        "latlong": [
            1.22,
            2.22
        ]
    };

    const sendOtp = async () => {
        const url = "https://cpidev.preoss.in/employee/v1/login/send/otp";
        try {
            const response = await axios.post(url, sendOTPRequestBody)
            console.log(response.data);
            if (response.data.success === false) {
                throw new Error(response.data.message);
            }
            console.log(response.data.data.ObjectID);
            setObjectId(response.data.data.ObjectID);
        }
        catch (error) {
            throw new Error(error.message);
        }
        setOtpSent(true);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        console.log(employeeId);

        toast.promise(sendOtp(), {
            loading: 'Sending OTP...',
            success: 'OTP sent successfully',
            error: error => error.message,
        });
    };

    const verifyOtp = async (otp) => {
        console.log(verifyOTPRequestBody);
        const url = "https://cpidev.preoss.in/employee/v1/login/verify/otp";
        try {
            const response = await axios.post(url, { ...verifyOTPRequestBody, OTP: otp })
            // console.log({ ...verifyOTPRequestBody, OTP: otp });
            console.log(response.data);
            if (response.data.success === false) {
                throw new Error(response.data.message);
            }
            localStorage.setItem('token', response.data.data);
            setLoggedIn(true);
            navigate('/');
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    const handleOPTChange = (event) => {
        event.preventDefault();
        if (event.target.value.length === 6) {
            toast.promise(verifyOtp(event.target.value), {
                loading: 'Verifying OTP...',
                success: 'OTP verified successfully',
                error: error => error.message,
            });
            // verifyOtp(event.target.value);
        }
    };

    return (
        <div className='container text-center p-5 login-form' style={{ border: "none", width: "29%", borderRadius: "110%", marginTop: "7%", minWidth: "390px" }}>
            <img src='/images/logo-element.svg' className='logo mt-0' alt='logo'></img>
            <h3 className='mt-1'>Welcome to PREOSS</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {!otpSent &&
                    <>
                        <Row className="mb-3 w-100 m-auto mt-4">
                            <Form.Group as={Col} controlId="validationCustom01">
                                <Form.Label>Employee Id<span style={{ color: "red" }}> *</span></Form.Label>
                                <Form.Control style={{ borderRadius: "20px", textAlign: "center", color: "white" }}
                                    required
                                    type="number"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">Employee Id is required</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className="circle-container" onClick={() => loginButtonRef.current.click()}>
                            <div className="circle"></div>
                            <img className="icon" src="/images/rarrow.svg" alt="submit" />
                        </div>
                        <input type='submit' ref={loginButtonRef} className='d-none'></input>
                    </>
                }

                {otpSent &&
                    <>
                        <Row className="mb-3 w-100 m-auto mt-4">
                            <Form.Group as={Col} controlId="validationCustom01">
                                <Form.Label>Code<span style={{ color: "red" }}> *</span></Form.Label>
                                <Form.Control style={{ borderRadius: "20px", textAlign: "center", color: "white" }}
                                    required
                                    type="number"
                                    onChange={handleOPTChange}
                                />
                                <Form.Control.Feedback type="invalid">Code is required</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className="circle-container" onClick={() => resendButtonRef.current.click()}>
                            <div className="circle"></div>
                            <img className="icon" src="/images/resendArrow.svg" alt="submit" />
                        </div>
                        <input type='submit' ref={resendButtonRef} className='d-none'></input>
                    </>
                }
            </Form>
        </div>
    );
}