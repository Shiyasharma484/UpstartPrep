import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Content, PopoverStyle, Title } from './style';

const ShipPopover = props => {
  const { content, placement, title, action, children } = props;
  const content1 = <Content>{content}</Content>;

  return (
    <PopoverStyle placement={placement} title={title && <Title>{title}</Title>} content={content1} trigger={action}>
      {children}
    </PopoverStyle>
  );
};

const content = (
  <>
    <div style={{width: "50vh"}}>
        <p>Shipping classes are used by certain shipping methods to group similar products.</p>
    </div>
  </>
);

ShipPopover.defaultProps = {
  action: 'hover',
  placement: 'bottomCenter',
  content,
};

ShipPopover.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export { ShipPopover };
