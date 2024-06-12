<template>
  <div class="comment_wraper bg-paletteWhite flex items-center rounded-md mb-4 p-2 relative">
    <div class="comment-left mt-2 self-start p-2">
      <div class="default-icon bg-primary-gradient h-12 w-12 rounded-full flex items-center justify-center overflow-hidden border-4 border-paletteBlue" :class="{ 'border-paletteOrange': comment.ai_generated }">
        <img :src="profileImage" />
      </div>
    </div>
    <!-- <div class="comment-action-buttons ml-auto bg-primary-gradient py-2 px-4 rounded-es-lg text-paletteWhite absolute top-0 end-0">
      <button class="action-button mr-2" @click="editComment">
        <font-awesome-icon :icon="['fas', 'edit']" class="text-paletteGray mr-1" />
        Edit
      </button>
      <button class="action-button mr-2" @click="deleteComment">
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-paletteGray mr-1" />
        Delete
      </button>
      <button class="action-button mr-2" @click="loveComment">
        <font-awesome-icon :icon="['fas', 'heart']" class="text-paletteGray mr-1" />
        Love
      </button>
      <button class="action-button mr-2" @click="replyComment">
        <font-awesome-icon :icon="['fas', 'reply']" class="text-paletteGray mr-1" />
        Reply
      </button>
    </div> -->
    <div class="comment-main flex flex-col justify-center grow p-2">
      <p class="comment-author font-semibold mb-2">
        {{ comment.ai_generated ? "Ixie AI" : `${comment.user.first_name || ""} ${comment.user.last_name || ""}` }} <span class="text-sm font-normal">({{ formattedDate }})</span>
      </p>
      <p class="comment-content">
        {{ comment.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { NButton } from "naive-ui";
import { formatDistanceToNow } from "date-fns";

export default {
  props: ["comment"],
  components: { NButton },
  computed: {
    formattedDate() {
      return formatDistanceToNow(new Date(this.comment.created_at), { addSuffix: true });
    },
    profileImage() {
      if (this.comment.ai_generated) {
        return `src/assets/images/profile-images/ai.jpg`;
      }
      return `src/assets/images/profile-images/1.jpg`;
      // return `src/assets/images/profile-images/${this.userData.avatar_id}.jpg`;
    },
  },
};
</script>

<style scoped></style>
