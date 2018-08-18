<template>
  <div
    :class="{'hover-style': !isSelected}"
    class="dropbox">
    <input
      v-if="!isSelected && !mustReset"
      :name="uploadFieldName"
      :accept="acceptType"
      type="file"
      class="input-file"
      @change="changeFile($event.target)">
    <p v-if="!isSelected">
      Drag image or click
    </p>
    <div v-else>
      <div class="preview">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="preview">
      </div>
      <div class="buttons">
        <a
          class="button"
          @click="reset">cancel
        </a>
        <a
          class="button"
          @click="upload">upload</a>
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
      mustReset: false,
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

      // remove file by rerender input element
      this.mustReset = true;
      this.$nextTick(() => {
        this.mustReset = false;
      });
    },
    changeFile({ name, files }) {
      if (!files.length) {
        return;
      }
      this.file = files[0];
      this.readUrl();
    },
    readUrl() {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    upload() {
      const formData = new FormData();
      formData.append(this.uploadFieldName, this.file, this.file.name);
      this.$emit('upload', formData);
    }
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  color: dimgray;
  min-height: 400px;
  max-height: 400px;
  min-width: 400px;
  max-width: 400px;
  position: relative;
}

.hover-style:hover {
  background-color: #f3fffc;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.preview {
  max-height: 250px;
  max-width: 250px;
  padding-top: 30px;
  margin: 0 auto;
}

.preview img {
  height: 100%;
  width: 100%;
}

.buttons {
  text-align: center;
  margin-top: 30px;
}

.button {
  width: 50px;
  padding: 5px 30px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-transition: background 0.5s;
  transition: background 0.5s;
}

.button:hover {
  background: #ececec;
}
</style>
