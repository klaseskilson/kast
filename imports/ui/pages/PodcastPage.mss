@import 'client/stylesheets/includes/_variables.scss',
        'client/stylesheets/includes/_mixins.scss';

.header {
  display: flex;
  padding: $padding-huge 0;

  @include phone() {
    padding: $padding-large 0;
  }
}

.image {
  width: 20%;
  max-width: 200px;

  img {
    width: 100%;
  }

  @include phone() {
    max-width: 70px;
  }
}

.content {
  width: 80%;
  padding-left: $padding-huge;

  h1 {
    margin-top: 0;
    margin-bottom: $padding-large;
  }
  h2 {
    margin: 0;
    font-weight: normal;
  }

  @include phone() {
    padding-left: $padding-large;
  }
}

.artistName {
  font-weight: bold;
}
