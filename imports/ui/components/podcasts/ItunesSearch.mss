@import 'client/stylesheets/includes/_mixins.scss',
        'client/stylesheets/includes/_variables.scss';

.searchResults {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.searchResults article {
  //flex-grow: 1;
  width: unquote("calc(25% - #{$padding-large})");

  @include tablet() {
    width: unquote("calc(#{100% / 3} - #{$padding-large})");
  }

  @include phone() {
    width: unquote("calc(50% - #{$padding-large})");
  }
}

//.searchResults > article ~ article {
//  margin-left: $padding-large;
//}
