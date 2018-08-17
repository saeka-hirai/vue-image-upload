<template>
  <div id="app">
    <div class="container">
      <div class="dropbox">
        <input
          v-if="!isSelected && !shouldReset"
          :name="uploadFieldName"
          :accept="acceptType"
          type="file"
          class="input-file"
          @change="changeFile($event.target)">
        <p v-if="!isSelected">
          Drag image or click
        </p>
        <div v-else>
          <div>
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="preview"
              alt="preview">
          </div>
          <div
            class="button button-usuallyBlue w-250 fs-14 mt-20 mb-50"
            @click.stop="reset">cancel
          </div>
          <div
            class="button button-usuallyBlue w-250 fs-14 mt-20 mb-50"
            @click.stop="upload">upload</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    acceptType: {
      type: String,
      default: 'image/jpeg image/png image/gif'
    },
    uploadFieldName: {
      type: String,
      default: 'image'
    }
  },
  data() {
    return {
      shouldReset: false,
      imageUrl: '',
      file: null
    };
  },
  computed: {
    isSelected() {
      return !!this.file;
    }
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      this.file = null;
      this.imageUrl = '';
      this.shouldReset = true;
      this.$nextTick(() => {
        this.shouldReset = false;
      });
    },
    changeFile({ name, files }) {
      if (!files.length) {
        return;
      }
      this.file = files[0];
      this.readUrl();
    },
    upload() {
      const formData = new FormData();
      formData.append(this.uploadFieldName, this.file, this.file.name);
      this.$emit('upload', formData);
    },
    readUrl() {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
.preview {
  max-height: 200px;
}
</style>
