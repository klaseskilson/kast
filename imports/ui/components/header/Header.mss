@import 'client/stylesheets/includes/_variables.scss';

.mainHeader {
  padding: 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  line-height: 1;

  &.top {
    a {
      color: #fff;
    }
  }
  &.detached {
    background: rgba(#fff, 0.8);
  }
}

