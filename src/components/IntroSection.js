import React from "react";
import Button from "./Button";
import '../styles/IntroSection.css';

const IntroSection = () => {
    return (
        <section className='intro-section'>
            <div className='intro-section-content'>
                <h1 className="main-h1">Test assignment for front-end developer</h1>
                <p className="main-p">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <div className='sign-up-button'>
                <Button>Sign up</Button>
            </div>
            </div>
             
        </section>

        
    )
}

export default IntroSection;