/**
 * Created by haojiachen on 2016/12/14.
 */
import React from 'react';
import {connect} from 'dva';

const RightsContainer = ({ common, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(React.Children.only(child), { disabled: true })
      })}
    </div>
  );
};

RightsContainer.propTypes = {};
RightsContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return { common: state.common };
};

export default connect(mapStateToProps)(RightsContainer);
