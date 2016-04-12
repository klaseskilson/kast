@import 'client/stylesheets/includes/_variables';

.textField {
  composes: nav-item-sizes from './Menu.mss';
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
    background: #fff;
    border-color: #fff;
  }
  &:focus {
    border-color: $teal;
  }
}
