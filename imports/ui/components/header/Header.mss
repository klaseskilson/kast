@import 'client/stylesheets/includes/_variables.scss';

.mainHeader {
  padding: 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  line-height: 1;
  background: linear-gradient(180deg, rgba($black, 0.12), rgba($black, 0));
  transition: 0.2s background ease;

  &.top {
    a {
      color: #fff;
    }
  }
  &.detached {
    background: rgba(#fff, 0.95);
    border-bottom: 1px solid $silver;
  }
}

/* searchform */
$unfocused-color:;
$focused-color:;
$unfocused-color-detached:;
$focused-color-detached:;
$background-color-detached:;
$background-color:;

.form {
  position: relative;
  height: 100%;
  padding: 6px;
  margin-left: $padding-large;
}

.textField {
  font-size: .9rem;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  padding: 8px 14px;
  border: 1px solid transparent;

  .mainHeader.detached & {
    background: $silver;
  }

  .mainHeader.top &:not(:focus):not(:hover) {
    color: $white;

    &::-moz-placeholder,
    &:-moz-placeholder,
    &:-ms-input-placeholder,
    &::-webkit-input-placeholder {
      color: $silver;
    }
  }

  .mainHeader.top &,
  &:focus,
  &:hover {
    border-color: rgba($light-gray, 0.5);
  }

  &:focus,
  &:hover {
    outline: none;
    background: rgba($light-gray, 0.9) !important;
  }
}

.submit {
  background: none;
  position: absolute;
  right: 3px;
  margin-top: 0.55rem;
  color: $gray;

  .mainHeader.top & {
    color: $light-gray;
  }

  .textField:focus + &,
  .textField:hover + & {
    color: $black;
  }
}


