import styled from 'styled-components'

export const Email = styled.i`
  color: #000;
  position: absolute;
  margin-left: 2px;
  margin-top: 4px;
  width: 15px;
  height: 10px;
  border-radius: 1px;
  border: solid 1px currentColor;

  &:before {
    content: '';
    position: absolute;
    left: 7px;
    top: -4px;
    width: 1px;
    height: 10px;
    background-color: currentColor;
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    -webkit-transform: rotate(-54deg);
    transform: rotate(-54deg);
  }

  &:after {
    content: '';
    position: absolute;
    left: 7px;
    top: -4px;
    width: 1px;
    height: 9px;
    background-color: currentColor;
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
    -webkit-transform: rotate(54deg);
    transform: rotate(54deg);
  }
`

export const User = styled.i`
  color: #000;
  position: absolute;
  margin-left: 3px;
  margin-top: 11px;
  width: 14px;
  height: 6px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px transparent;
  border-radius: 6px 6px 0 0;

  &:before {
    content: '';
    position: absolute;
    left: 2px;
    top: -10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: solid 1px currentColor;
  }
`

export const Key = styled.i`
  color: #000;
  position: absolute;
  margin-left: 3px;
  margin-top: 10px;
  width: 13px;
  height: 6px;
  border-radius: 1px;
  border: solid 1px currentColor;
  background-color: currentColor;

  &:before {
    content: '';
    position: absolute;
    left: 3px;
    top: -8px;
    width: 5px;
    height: 6px;
    border-radius: 4px 4px 0 0;
    border-top: solid 1px currentColor;
    border-left: solid 1px currentColor;
    border-right: solid 1px currentColor;
  }
`
