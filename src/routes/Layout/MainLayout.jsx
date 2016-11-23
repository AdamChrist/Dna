import React, {Component, PropTypes} from 'react';

class MainLayout extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="ant-layout-aside">
        sss
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;

