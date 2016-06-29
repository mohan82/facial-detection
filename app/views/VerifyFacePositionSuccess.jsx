import React, {
    PropTypes,
} from 'react';
import VerificationSuccess from '../components/VerificationSuccess.jsx';
const VerifyFacialPositionSuccess = React.createClass({
    componentDidMount(){
        setTimeout(()=>{this.context.router.push("/facial-detection-step3")},
            1500);
    },
    render() {
        return (
            <VerificationSuccess title =""/>
        );
    }
});

VerifyFacialPositionSuccess.contextTypes={
    router: function () {
        return React.PropTypes.func.isRequired;
    }
}


export default VerifyFacialPositionSuccess;
