import { storiesOf } from '@storybook/vue';

import ImageUpload from '../src/ImageUpload.vue';

storiesOf('ImageUpload').add('single use', () => ({
  components: { ImageUpload },
  template: '<div id="container"><image-upload /></div>'
}));
