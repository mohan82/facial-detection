import React from 'react';

const NavigationBar = React.createClass({
    render() {
        return (
            <header role="banner">
                <div className="govau--header">
                    <h2>
                        Digital Identity&nbsp;
                        <span className="badge--alpha">alpha</span>
                    </h2>
                </div>
            </header>
        );
    }
});

export default NavigationBar;
