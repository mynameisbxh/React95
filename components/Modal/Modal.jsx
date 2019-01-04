import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Draggable from 'react-draggable';
import Btn from '../shared-style/Btn';
import Button from '../Button';
import Icon from '../Icon';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  padding: 2px 3px;
  min-width: 300px;
  min-height: 200px;

  top: 50px;

  background-color: #c3c7cb;

  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 1px #000;
`;

const TitleBar = styled.div`
  margin-bottom: 2px;

  background-color: #00007f;
  color: white;
  padding: 2px 4px;

  display: flex;
`;

const Title = styled.div`
  flex-grow: 1;
`;

const OptionsBox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
`;

const Option = styled(Btn)`
  margin-right: 3px;
  padding: 0 0 0 1px;

  width: 17px;
  height: 17px;
  min-width: 0;

  font-size: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:active {
    padding: 1px 0 0 1px;

    outline: none;

    box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  padding: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  padding: 0 6px 6px 6px;

  & ${Btn} {
    margin-right: 6px;
    min-width: 80px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;

  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-bottom: 3px;

  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #848284;

  box-shadow: 0 1px 0 0 #e6e6e6;
`;

const MenuItem = styled.li`
  position: relative;
  padding-left: 6px;
  padding-right: 6px;

  user-select: none;

  ul {
    position: absolute;
    left: 0;
    color: #000;
  }

  ${({ active }) =>
    active &&
    `
      background-color: #00007f;
      color: #FFF;
    `};
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened: '',
    };
  }

  _menuClick = menuOpened => {
    this.setState({ menuOpened });
  };

  _resetState = () => {
    this.setState({ menuOpened: '' });
  };

  render() {
    const {
      closeModal,
      title,
      children,
      buttons,
      icon,
      menu,
      top,
      left,
    } = this.props;

    const iconStyle = {
      width: 16,
      height: 19,
      style: {
        marginRight: '4px',
      },
    };

    const position = {
      top,
      left,
    };

    return (
      <React.Fragment>
        <Draggable handle=".draggable">
          <ModalWrapper style={position}>
            <TitleBar className="draggable">
              {icon && <Icon name={icon} {...iconStyle} />}
              <Title>{title}</Title>
              <OptionsBox>
                <Option>?</Option>
                <Option onClick={closeModal}>x</Option>
              </OptionsBox>
            </TitleBar>

            {menu && (
              <MenuWrapper>
                {menu.map(({ name, list }) => {
                  const active = this.state.menuOpened === name;
                  return (
                    <MenuItem
                      key={name}
                      onMouseDown={() => this._menuClick(name)}
                      active={active}
                    >
                      {name}
                      {active && list}
                    </MenuItem>
                  );
                })}
              </MenuWrapper>
            )}

            <Content onClick={this._resetState}>{children}</Content>
            {buttons && (
              <ButtonWrapper>
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    onClick={button.onClick}
                    value={button.value}
                  />
                ))}
              </ButtonWrapper>
            )}
          </ModalWrapper>
        </Draggable>
      </React.Fragment>
    );
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  icon: PropTypes.string,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
  ),
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      list: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]).isRequired,
    }),
  ),
};

Modal.defaultProps = {
  icon: '',
  title: 'Modal',
  chidren: null,
  buttons: [],
  menu: [],
  closeModal: () => {},
};

export default Modal;
