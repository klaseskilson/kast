@import 'client/stylesheets/includes/_variables.scss';

.textField {
  composes: nav-item-sizes from './Menu.mss';
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  max-width: 100px;

  &:focus,
  &:hover {
    outline: none;
    background: #fff;
    border-color: #fff;
  }
  &:focus {
    border-color: $teal;
    max-width: 250px;
  }
}
