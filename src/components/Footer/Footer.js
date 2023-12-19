import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <div>
        <br />
        <hr style={{marginTop:20}} className="footer--line" />
        <div className="footer--container">
            
            <h3 className="footer--title">Learners corner.</h3>
            <div className="footer--bottom">
                <p className="copy">© Mzota 2023 . All rights reserved</p>
                <div className="about--icons">
                  <i class="fab fa-facebook"></i>
                  <i class="fab fa-twitter"></i>
                  <i class="fab fa-instagram-square"></i>
                  <i class="fab fa-youtube"></i>
            </div>

            </div>
            
        
        </div>

    </div>
  )
}

export default Footer