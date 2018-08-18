import { storiesOf } from '@storybook/vue';

import ImageUpload from '../src/ImageUpload.vue';

storiesOf('ImageUpload').add('single use', () => ({
  components: { ImageUpload },
  template: `
  <div id="container">
    <image-upload
      @upload="upload"
      ref="imageUpload"/>
  </div>`,
  methods: {
    upload() {
      setTimeout(() => {
        this.$refs.imageUpload.reset();
        window.alert('upload complete!!');
      }, 500);
    }
  }
}));
