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
    background: rgba(#fff, 0.8);
  }
}

