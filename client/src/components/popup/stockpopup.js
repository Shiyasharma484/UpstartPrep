import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Content, PopoverStyle, Title } from './style';

const StockPopover = props => {
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
        <p>Controls whether or not the product is listed as "in stock" or "out of stock" on the frontend.</p>
    </div>
  </>
);

StockPopover.defaultProps = {
  action: 'hover',
  placement: 'bottomCenter',
  content,
};

StockPopover.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export { StockPopover };
