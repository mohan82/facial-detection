import React, {
    PropTypes,
} from 'react';

const FacePosition = React.createClass({
    render() {
        return (
            <div>
                <h4>Please position your face within the circle </h4>
                {this.props.children}
               </div> );

    }
});

export default FacePosition;
