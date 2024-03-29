import * as Yup from 'yup';
import { useState } from 'react'
import { useFormik } from "formik";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Input from '../reusable component/Input';
import Button  from '../reusable component/Button';
import TextArea from '../reusable component/TextArea';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import {FaMailBulk,FaPhone} from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
const Contact = () => {

  const [ firstName, setFirstName ] = useState( "" )
  const [ email, setEmail ] = useState( "" )
  const [ message, setMessage ] = useState( "" )
  const [ submitMessage, setSubmitMessage ] = useState( false)
  
  const form = useRef()
  //form validation 
  const Schema = Yup.object().shape( {
    firstName: Yup.string()
      .required( "Enter a value for this field." ).min( 3, "First name must be at least 3 characters." )
      .max( 50, "First name cannot exceed 50 characters." ),
    message: Yup.string()
      .required( "Enter a value for this field." )
      .min( 5, "Message must be at least 5 characters." ),
    email: Yup.string()
      .matches( /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format" )
      .required( "Enter a value for this field." ),
  } );

  const handleSubmit = (  ) => {
    // send users message  to support@blulabs.net
    emailjs.sendForm( 'service_xlgeonp', 'template_nk3dkjo', form.current, 'Wbrx9VKHYYWcL3mTW' )
      .then(() => {
        // console.log( result.text );
         formik.resetForm();
        setFirstName( "" );
        setEmail( "" );
        setMessage( "" );
      }, () => {
          // console.log(error.text);
      } );
    
    setSubmitMessage( true );
     setTimeout(() => {
    setSubmitMessage(false);
  }, 3000); 
    
  }
  
  const formik = useFormik( {
    initialValues: {
      _id: new Date().getTime(),
      firstName: firstName,
      email: email,
      message: message,
    },
    
    validationSchema: Schema,
    onSubmit: handleSubmit
    
  } );
  
  
  return (
    <div className='contact py-10 md:py-16'>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-11/12 md:w-10/12 mx-auto">
        <div className="w-full flex flex-col gap-3 font-poppins">
          <div className="flex flex-col gap-2">
            <h5 className="text-tertiary-100 text-xl md:text-3xl font-semibold">Need additional information?</h5>
            <p className="text-tertiary-100/70 w-3/4  text-left font-poppins text-xs md:text-base ">
              Elevate Your Experience: Seamless, Intuitive Software at Your Fingertips!
            </p>
          </div>
          <div className=" text-tertiary-100/90  text-left font-poppins text-sm md:text-base ">
            <a href="mailto:support@blulabs.net" target="_blank" rel="noopener noreferrer" className="flex w-max items-center gap-2"><FaMailBulk /><span>support@blulabs.net</span></a>
            <a href="https://maps.app.goo.gl/R1MexHMnpyXvxq2u8" target="_blank" rel="noopener noreferrer" className="flex w-max items-center gap-2"><FaLocationDot /><span>Bole, sub city, 22 Festival 22 Building, #401</span></a>
            <a href="tel:0908555657" className="flex w-max items-center gap-2"><FaPhone /><span>+251908555657</span></a>
          </div>

          <div className="flex gap-4  text-tertiary-100">
            <a href="https://blu-labs-company.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-all duration-300"><FaFacebook size={ 25 } /></a>
            <a href="https://blu-labs-company.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-all duration-300"><FaInstagram  size={25}/></a>
            <a href="https://blu-labs-company.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-all duration-300"><FaLinkedin  size={25}/></a>
          </div>
        </div>

        <div className="sm:w-3/4  ">
         
          <form ref={ form } onSubmit={ formik.handleSubmit }>
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-lg uppercase md:text-3xl font-inter font-semibold text-primary-300">Contact us</h1>
               { submitMessage &&
            <div className="flex justify-between bg-green-300 font-poppins text-sm md:text-base font-light px-4 py-3 rounded w-full">
              <span>
              Your message was submitted!

              </span>
              <span onClick={()=>setSubmitMessage(false)} className='text-red-700 cursor-pointer'>
                x
              </span>

            </div> }
              <Input
                type="text"
                label="First Name"
                placeHolder="First Name"
                require={ true }
                name="firstName"
                value={ formik.values.firstName }
                error={ formik.touched.firstName && formik.errors.firstName }
                onBlur={ formik.handleBlur }
                onChange={ ( e ) => {
                  formik.handleChange( e );
                  setFirstName( e.target.value );
                } }
              />
              
              <Input
                type="text"
                label="Email"
                placeHolder="example@gmail.com"
                require={ true }
                name="email"
                value={ formik.values.email }
                error={ formik.touched.email && formik.errors.email }
                onBlur={ formik.handleBlur }
                onChange={ ( e ) => {
                  formik.handleChange( e );
                  setEmail( e.target.value );
                } }
              />

              <TextArea
                type="textarea"
                placeHolder="Write a message"
                label="Tell us about it"
                require={ true }
                name="message"
                value={ formik.values.message }
                error={ formik.touched.message && formik.errors.message }
                onBlur={ formik.handleBlur }
                onChange={ ( e ) => {
                  formik.handleChange( e );
                  setMessage( e.target.value );
                } }
              />
              <Button
                type="submit"
                handleClick={ handleSubmit }
                small
                color='primary'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Contact