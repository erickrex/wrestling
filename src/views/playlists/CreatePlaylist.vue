<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Make your predictions</h4>
      <input type="text" required placeholder=" match" v-model="match" />
      <textarea
        required
        placeholder=" description..."
        v-model="description"
      ></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("predictions");
    const { user } = getUser();
    const router = useRouter();
    const match = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          match: match.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          //all fire collections gotta have songs
          extraComments: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({
            name: "PlaylistDetails",
            params: { id: res.id, toUrl: res.userName },
          });
        }
        console.log(res.id + res.userName);
      }
    };
    // allowed file types
    const types = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      match,
      description,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
    };
  },
};
</script>

<style>
form {
  background: black;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>