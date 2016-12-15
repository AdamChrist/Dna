/**
 * Created by haojiachen on 2016/12/14.
 */
import React from 'react';
import {connect} from 'dva';

const RightsContainer = ({ common, children }) => {

  const { user } =  common;
  const userRights = user.rights || [];

  /**
   * 根据权限返回对应的button
   * @param rights
   * @param buttonElement
   * @returns {*}
   */
  const getRightsButton = (rights, buttonElement) => {
    const rightsKey = buttonElement.props['data-rightsKey'];
    let button = buttonElement;
    rights.forEach(n => {
      if (n.code === rightsKey && !n.hasRights) {
        if (n.type === 'disabled') {
          button = React.cloneElement(React.Children.only(buttonElement), { disabled: true })
        } else {
          button = '';
        }
      }
    });
    return button;
  };

  /**
   * 遍历children,控制权限
   * @param userRights
   * @param elements
   * @returns {*}
   */
  const getAllButton = (userRights, elements) => {
    return React.Children.map(elements, (child) => {
      const childType = child.type.name;
      let element = '';
      switch (childType) {
        case 'Button':
          element = getRightsButton(userRights, child);
          break;
        case 'ButtonGroup':
          element = React.cloneElement(child, { children: getAllButton(userRights, child.props.children) });
          break;
        case 'Popconfirm':
          //如果是气泡确认框并且child是button
          const pButton = child.props.children;
          if (React.isValidElement(pButton) && pButton.type.name === 'Button')
            element = React.cloneElement(child, { children: getRightsButton(userRights, pButton) });
          else {
            element = child;
          }
          break;
        default:
          element = child;
      }
      return element;
    })
  };

  return (
    <div>
      {getAllButton(userRights, children)}
    </div>
  );
};

RightsContainer.propTypes = {};
RightsContainer.defaultProps = {};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(RightsContainer);
