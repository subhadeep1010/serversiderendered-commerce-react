import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter, Link } from "react-router-dom";
export class Footer extends Component {
    // static propTypes = {

    // }

    render() {
        return (
            <React.Fragment>
                <footer className="footer_area clearfix">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-7">
                                <div className="single_widget_area">
                                    <div className="footer-logo mr-50">
                                    <Link to="/">
                                        <h2>Clothen<span>tiK</span></h2>
                                    </Link>
                                    </div>
                                    <p className="copywrite">
                                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-xl-5">
                                <div className="newsletter-form mb-50">
                                    <form>
                                        <input type="email" name="email" className="nl-email" placeholder="Your E-mail" />
                                        <input type="submit" value="Subscribe" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer
