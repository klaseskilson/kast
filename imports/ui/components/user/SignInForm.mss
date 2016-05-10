@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

$facebook: #586595;
$google: #F63C3E;

button.facebook,
button.google {
  color: #fff;
  margin-top: $padding-small;
}

button.facebook {
  background: $facebook;
  border-color: darken($facebook, 15%);

  &:hover:not(:disabled) {
    border-color: darken($facebook, 30%);
  }
}

button.google {
  background: $google;
  border-color: darken($google, 15%);

  &:hover:not(:disabled) {
    border-color: darken($google, 30%);
  }
}
