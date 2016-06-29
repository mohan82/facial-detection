import React from 'react'

class VerificationSuccess extends  React.Component {

    constructor(props){
        super(props);
    }
    componentDidMount(){
        $('#spinner').removeClass("inactive");
        $('main').addClass('inactive')
        window.setTimeout(function(){
            $('#spinner').addClass('inactive');
            $("main").removeClass("inactive");
        },100);
    }

    render(){
        let title = this.props.title ||"";
        let nextPath = this.props.nextPath || "/";
        let nextButton="";
        return (
            <div className=" verificationSuccess">
                <div className="row">
                    <h4>
                        {title}
                    </h4>
                </div>
                <div className="voffset-1  tick">
                    <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div className="voffset-1">
                    {nextButton}
                </div>
            </div>
        )
    }

}

export default VerificationSuccess;