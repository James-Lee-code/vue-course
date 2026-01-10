<template>
  <span class="badge" :class="badgeClass">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    // 顯示用文字（不再使用 toUpperCase，避免中文/undefined 爆錯）
    text() {
      return this.title || '';
    },

    // 將「中文類型」轉成「英文 class」
    badgeClass() {
      const map = {
        多益課程: 'toeic',
        雅思課程: 'ielts',
        課後輔導: 'career'
      };

      return map[this.type] || '';
    }
  }
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

/* 英文 class 對應樣式 */
.toeic {
  background-color: #3d008d;
  color: white;
}

.ielts {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
